import React from 'react'
import { loadTossPayments } from '@tosspayments/payment-sdk'

const PayMent = () => {
  const handleClick = async () => {
    const tossPayments = await loadTossPayments(
      'test_ck_XjExPeJWYVQNYYg1yqxr49R5gvNL'
    )
    
    //첫번째 인자값은 결제 방법
    await tossPayments.requestPayment('카드', {
      amount: 5000,
      orderId: Math.random().toString(36).slice(2),
      orderName: '맥북',
      successUrl: `${window.location.origin}/api/payment`,
      failUrl: `${window.location.origin}/api/payments/fail`,
    })
  }
  return <button onClick={handleClick}>결제하기</button>
}

export default PayMent
