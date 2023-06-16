import React, { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
const PaymentRedirect = () => {
  const router = useRouter()
  const searchParams = router.query

  const secretKey = 'test_sk_aBX7zk2yd8yoAolYXpvVx9POLqKQ'
  const basicToken = Buffer.from(`${secretKey}:`, `utf-8`).toString('base64')

  const url = `https://api.tosspayments.com/v1/payments/orders/${searchParams?.orderId}`

  const test = useCallback(async () => {
    const payments = await fetch(url, {
      headers: {
        Authorization: `Basic ${basicToken}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())
    console.log(payments)
  }, [basicToken, url])
  
  useEffect(() => {
    test()
  }, [test])

  // const { card } = payments
  return (
    <div>
      <h1>결제가 완료되었습니다</h1>
      <ul>
        {/* <li>결제 상품 {payments.orderName}</li>
        <li>주문번호 {payments.orderId} </li>
        <li>카드회사 {card.company}</li>
        <li>카드번호 {card.number}</li>
        <li>결제금액 {card.amount}</li>
        <li>
          결제승인날짜{' '}
          {Intl.DateTimeFormat().format(new Date(payments.approvedAt))}
        </li> */}
      </ul>
    </div>
  )
}

export default PaymentRedirect
