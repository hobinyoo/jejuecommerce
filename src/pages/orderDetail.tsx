import Button from '@components/cs/Button'
import Header from '@components/cs/Header'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React from 'react'
import { OrderProps } from 'types/types'

const OrderDetail = () => {
  const router = useRouter()

  const { data } = useQuery<{ items: OrderProps[] }, unknown, OrderProps[]>({
    queryKey: [`/api/get-orderDetail?id=${router.query.uid}`],
    queryFn: () =>
      fetch(`/api/get-orderDetail?id=${router.query.uid}`).then((res) =>
        res.json().then((data) => data.items)
      ),
  })

  return (
    <div css={{ overflowY: 'auto' }}>
      <Header />
      {data &&
        data.map((value, index) => {
          return (
            <div
              css={{
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid black',
                padding: '1rem',
                marginBottom: '1rem',
              }}
              key={index}
            >
              <div>메뉴: {value.menu}</div>
              <div>수량: {value.quantity}</div>
              <div>가격: {value.totalPrice}</div>
              <div>받는사람: {value.name}</div>
              <div>핸드폰 번호: {value.phoneNumber}</div>
              <div>주소: {value.address}</div>
              <div>상세주소: {value.addressDetail}</div>
              <div>우편번호: {value.postCode}</div>
              <div css={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>배송현황: {value.status}</div>
                {value.status === '상품준비' && (
                  <Button
                    onClick={() => router.push(`/comment?orderId=${value.id}`)}
                  >
                    후기작성
                  </Button>
                )}
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default OrderDetail
