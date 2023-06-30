import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

interface CompletePaymentsInfo {
  orderName: string
  orderId: string
  number: string
  amount: string
  approvedAt: string
}

const Timer = () => {
  const router = useRouter()

  const [seconds, setSeconds] = useState<number>(5)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1)
    }, 1000)

    if (seconds === 0) {
      clearInterval(interval)
      router.push('/')
    }

    return () => {
      clearInterval(interval) // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
    }
  }, [router, seconds])

  return (
    <div>
      <div>남은 초: {seconds}</div>
      <div>5초 후 메인 페이지로 이동합니다.</div>
    </div>
  )
}
const PaymentsRedirect = () => {
  const router = useRouter()
  const searchParams = router.query

  const [completePaymentsInfo, setCompletePaymentsInfo] = useState(
    {} as CompletePaymentsInfo
  )

  const secretKey = 'test_sk_aBX7zk2yd8yoAolYXpvVx9POLqKQ'
  const basicToken = Buffer.from(`${secretKey}:`, `utf-8`).toString('base64')

  const url = `https://api.tosspayments.com/v1/payments/orders/${searchParams?.orderId}`

  const completePayments = useCallback(async () => {
    const payments = await fetch(url, {
      headers: {
        Authorization: `Basic ${basicToken}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())

    if (payments.card?.number) {
      setCompletePaymentsInfo({
        orderName: payments.orderName,
        orderId: payments.orderId,
        number: payments.card.number,
        amount: payments.card.amount,
        approvedAt: payments.approvedAt,
      })
    }
  }, [basicToken, url])

  useEffect(() => {
    completePayments()
  }, [completePayments])

  return (
    <div css={{ marginTop: '2rem' }}>
      <h1>결제가 완료되었습니다</h1>

      <ul css={{ marginTop: '2rem' }}>
        <li>결제 상품: {completePaymentsInfo?.orderName}</li>
        <li>주문번호: {completePaymentsInfo?.orderId} </li>
        <li>카드회사: {'토스뱅크'}</li>
        <li>카드번호: {completePaymentsInfo?.number}</li>
        <li>결제금액: {completePaymentsInfo?.amount}</li>
        <li>결제승인날짜: {completePaymentsInfo?.approvedAt}</li>
      </ul>

      <Timer />
    </div>
  )
}

export default PaymentsRedirect
