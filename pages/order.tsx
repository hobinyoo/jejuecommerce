import Header from '@components/Header'
import { useRouter } from 'next/router'
import React from 'react'

const Order = () => {
  const router = useRouter()
  console.log(router.query)
  return (
    <div>
      <Header />
      <div>주문하기</div>
    </div>
  )
}

export default Order
