import { CountControl } from '@components/CountControl'
import IconX from '../public/X.svg'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Badge, Button } from '@mantine/core'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { OrderItem, Orders } from '@prisma/client'
import { useRouter } from 'next/router'
import { format } from 'date-fns'

interface OrderItemDetail extends OrderItem {
  name: string
  image_url: string
}

interface OrderDetail extends Orders {
  orderItems: OrderItemDetail[]
}

const ORDER_STATUS_MAP = [
  '주문취소',
  '주문대기',
  '결제대기',
  '결제완료',
  '배송대기',
  '배송중',
  '배송완료',
  '환불대기',
  '환불완료',
  '반품대기',
  '반품완료',
]

export const ORDER_QUERY_KEY = '/api/get-order'

export default function MyPage() {
  const { data } = useQuery<{ items: OrderDetail[] }, unknown, OrderDetail[]>({
    queryKey: [ORDER_QUERY_KEY],
    queryFn: () =>
      fetch(ORDER_QUERY_KEY).then((res) =>
        res.json().then((data) => data.items)
      ),
  })

  return (
    <div>
      <span className="text-2xl mb-3">주문내역({data ? data.length : 0})</span>
      <div className="flex ">
        <div className="flex flex-col p-4 spcace-y-4 flex-1">
          {data ? (
            data.length > 0 ? (
              data.map((item, idx) => <DetailItem key={idx} {...item} />)
            ) : (
              <div>주문내역이 아무것도 없습니다.</div>
            )
          ) : (
            <div>불러오는 중..</div>
          )}
        </div>
      </div>
    </div>
  )
}

const DetailItem = (props: OrderDetail) => {
  const queryClient = useQueryClient()
  const STATUS_QUERY_KEY = '/api/update-status'

  const { mutate: updateStatus } = useMutation<unknown, unknown, number, any>(
    (orderItemIds) =>
      fetch(STATUS_QUERY_KEY, {
        method: 'POST',
        body: JSON.stringify({ orderItemIds }),
      })
        .then((res) => res.json())
        .then((data) => data.items),
    {
      onMutate: async (orderItemIds) => {
        // 해당 query의 refetch를 취소 optimistic update가 이뤄지기전에
        // 실제로 서버에서 가져온 데이터가 화면에 오버라이트를 방지하기 위함
        await queryClient.cancelQueries([ORDER_QUERY_KEY])

        //현재의 값을 가져옴
        const previous = queryClient.getQueryData([ORDER_QUERY_KEY])

        // 현재 값에 새로운 값을 update or edit optimistic update
        queryClient.setQueryData<OrderDetail[]>([ORDER_QUERY_KEY], (old) =>
          old
            ? old.filter((item) =>
                item.orderItemIds == String(orderItemIds)
                  ? { ...item, status: 5 }
                  : 0
              )
            : []
        )
        // 이전 값을 반환 onError 핸들링
        return { previous }
      },
      onError: (__, _, context) => {
        queryClient.setQueryData([ORDER_QUERY_KEY], context.previous)
      },
      onSuccess: () => {
        //invalidateQueries는 useQuery에서 사용되는 queryKey의 캐시 데이터를 제거해줍니다.
        //데이터가 새롭게 추가 되었을 때 다시 서버에서 데이터를 가져옴
        queryClient.invalidateQueries([ORDER_QUERY_KEY])
      },
    }
  )
  const { mutate: deleteOrder } = useMutation<unknown, unknown, number, any>(
    (orderItemIds) =>
      fetch('/api/delete-order', {
        method: 'POST',
        body: JSON.stringify({ orderItemIds }),
      })
        .then((res) => res.json())
        .then((data) => data.items),
    {
      onMutate: async (id) => {
        //찜하기 업데이트 바로 반영
        await queryClient.cancelQueries([ORDER_QUERY_KEY])

        // Snapshot the previous value
        const previous = queryClient.getQueryData([ORDER_QUERY_KEY])

        // Optimistically update to the new value
        queryClient.setQueryData<OrderDetail[]>([ORDER_QUERY_KEY], (old) =>
          old?.filter((c) => c.id !== id)
        )

        // Return a context object with the snapshotted value
        return { previous }
      },
      onError: (__, _, context) => {
        queryClient.setQueryData([ORDER_QUERY_KEY], context.previous)
      },
      onSuccess: () => {
        //기존에 있는 쿼리를 다시 부르게 만드는 상태
        queryClient.invalidateQueries([ORDER_QUERY_KEY])
      },
    }
  )


  const handlePayment = () => {
    updateStatus(props.id)
  }

  const handleDelete = () => {
    alert('주문내역 삭제')
    deleteOrder(props.id)
  }
  return (
    <div
      className="w-full flex flex-col p-4 rounded-md mb-8"
      style={{ border: '1px solid gray' }}
    >
      <div>
        <div className="flex">
          <Badge color={props.status === 0 ? 'red' : ''} className="mb-2">
            {ORDER_STATUS_MAP[props.status + 1]}
          </Badge>
          <IconX className="ml-auto" onClick={handleDelete} />
        </div>

        {props.orderItems.map((orderItem, idx) => (
          <Item key={idx} {...orderItem} status={props.status} />
        ))}

        <div className="flex mt-4">
          <div className="flex flex-col">
            <span className="mb-2">주문 정보</span>
            <span>받는사람: {props.receiver ?? '입력필요'}</span>
            <span>주소:{props.address ?? '입력필요'}</span>
            <span>연락처:{props.phoneNumber ?? '입력필요'}</span>
          </div>
          <div className="flex flex-col ml-auto mr-4 text-right">
            <span className="mb-2 font-semibold">
              합계 금액:
              <span className="text-red-500">
                {props.orderItems
                  .map((item) => item.amount)
                  .reduce((prev, curr) => prev + curr, 0)
                  .toLocaleString('ko-kr')}
                원
              </span>
            </span>
            <span className="text-zinc-400 mt-auto mb-auto">
              주문일자:
              {format(new Date(props.createdAt), 'yyyy년 M월 d일 HH:mm:ss')}
            </span>
            <Button
              style={{ backgroundColor: 'black', color: 'white' }}
              onClick={handlePayment}
            >
              결제 처리
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

//props 확장
const Item = (props: OrderItemDetail & { status: number }) => {
  const router = useRouter()
  const [quantity, setQuantity] = useState<number | undefined>(props.quantity)
  const [amount, setAmount] = useState<number>(props.quantity)

  useEffect(() => {
    if (quantity != null) {
      setAmount(quantity * props.price)
    }
  }, [quantity, props.price])

  const handleComment = () => {
    router.push(`/comment/edit?orderItemId=${props.id}`)
  }
  return (
    <div className="w-full flex p-4" style={{ borderBottom: '1px solid gray' }}>
      <Image
        src={props.image_url}
        width={155}
        height={155}
        alt={props.name}
        onClick={() => router.push(`/products/${props.productId}`)}
      />
      <div className="flex flex-col ml-4">
        <span className="font-semibold mb-2">{props.name}</span>
        <span className="mb-auto">
          가격:{props.price.toLocaleString('ko-kr')}원
        </span>

        <div className="flex items-center space-x-4">
          <CountControl value={quantity} setValue={setQuantity} max={20} />
        </div>
      </div>
      <div className="flex flex-col ml-auto space-x-4">
        <span>{amount.toLocaleString('ko-kr')} 원</span>
        {props.status === 5 && (
          <Button
            style={{
              backgroundColor: 'black',
              color: 'white',
              marginTop: 'auto',
            }}
            onClick={handleComment}
          >
            후기작성
          </Button>
        )}
      </div>
    </div>
  )
}
