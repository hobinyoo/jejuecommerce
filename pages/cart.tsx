import { CountControl } from '@components/CountControl'
import IconRefresh from '../public/Refresh.svg'
import IconX from '../public/X.svg'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import styled from '@emotion/styled'

interface CartItem {
  name: string
  productId: number
  price: number
  quanitiy: number
  amount: number
  image_url: string
}
export default function Cart() {
  const [data, setData] = useState<CartItem[]>([])

  const diliveryAmount = 5000
  const discountAmount = 0

  const amount = useMemo(() => {
    return data
      .map((item) => item.amount)
      .reduce((prev, curr) => prev + curr, 0)
  }, [data])
  useEffect(() => {
    const mockData = [
      {
        name: '멋드러진 후디후리',
        productId: 300,
        price: 20000,
        quanitiy: 1,
        amount: 20000,
        image_url:
          'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NS95N51B_NS95N51B_hover.jpg?browse',
      },
      {
        name: '멋드러진 신발',
        productId: 301,
        price: 20000,
        quanitiy: 1,
        amount: 20000,
        image_url:
          'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5PN50K_NM5PN50K_hover.jpg?browse',
      },
    ]
    setData(mockData)
  }, [])
  return (
    <div>
      <span className="text-2xl mb-3">Cart({data.length})</span>
      <div className="flex ">
        <div className="flex flex-col p-4 spcace-y-4 flex-1">
          {data.map((item, idx) => (
            <Item key={idx} {...item} />
          ))}
        </div>
        <div className="px-4">
          <div
            className="flex flex-col p-4 space-y-4"
            style={{ minWidth: 300, border: '1px solid grey' }}
          >
            <div>Info</div>
            <Row>
              <span>금액</span>
              <span>{amount.toLocaleString('ko-kr')}원</span>
            </Row>
            <Row>
              <span>배송비</span>
              <span>{diliveryAmount.toLocaleString('ko-kr')}원</span>
            </Row>
            <Row>
              <span>할인금액</span>
              <span>{discountAmount.toLocaleString('ko-kr')}원</span>
            </Row>
            <Row>
              <span className="font-semibold">결제금액</span>
              <span className="font-semibold text-red-500">
                {(amount + diliveryAmount - discountAmount).toLocaleString(
                  'ko-kr'
                )}
                원
              </span>
            </Row>
          </div>
        </div>
      </div>
    </div>
  )
}

const Item = (props: CartItem) => {
  const [quantity, setQuantity] = useState<number | undefined>(props.quanitiy)
  const [amount, setAmount] = useState<number>(props.quanitiy)
  useEffect(() => {
    if (quantity != null) {
      setAmount(quantity * props.price)
    }
  }, [quantity, props.price])
  return (
    <div className="w-full flex p-4" style={{ borderBottom: '1px solid gray' }}>
      <Image src={props.image_url} width={155} height={155} alt={props.name} />
      <div className="flex flex-col ml-4">
        <span className="font-semibold mb-2">{props.name}</span>
        <span className="mb-auto">
          가격:{props.price.toLocaleString('ko-kr')}원
        </span>

        <div className="flex items-center space-x-4">
          <CountControl value={quantity} setValue={setQuantity} max={20} />
          <IconRefresh />
        </div>
      </div>
      <div className="flex ml-auto space-x-4">
        <span>{amount.toLocaleString('ko-kr')} 원</span>
        <IconX />
      </div>
    </div>
  )
}

const Row = styled.div`
  display: flex;
  //내부에 있는 내용들 간의 상태?
  * ~ * {
    margin-left: auto;
  }
`
