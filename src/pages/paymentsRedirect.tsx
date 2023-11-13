import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from 'src/firebase/initFirebase'
import { format } from 'date-fns'
import { isEmpty } from 'lodash'
import CSText from '@components/cs/CSText'

interface PaymentInfo {
  orderName: string
  totalAmount: number
  method: string
  approvedAt: string
  receipt: string
}

const PaymentsRedirect = () => {
  const router = useRouter()
  const searchParams = router.query

  const [paymentInfo, setPaymentInfo] = useState({} as PaymentInfo)

  const secretKey = 'test_sk_aBX7zk2yd8yoAolYXpvVx9POLqKQ'
  const basicToken = Buffer.from(`${secretKey}:`, `utf-8`).toString('base64')

  const url = `https://api.tosspayments.com/v1/payments/orders/${searchParams?.orderId}`

  const completePayments = useCallback(async () => {
    if (!isEmpty(searchParams?.orderId)) {
      const payments = await fetch(url, {
        headers: {
          Authorization: `Basic ${basicToken}`,
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json())

      await updateDoc(doc(db, 'orders', String(searchParams?.orderId)), {
        paymentKey: payments.paymentKey,
        status: payments.status,
        timestamp: format(new Date(payments.approvedAt), 'yyyy/MM/dd HH:mm:ss'),
        method: payments.method,
        receipt: payments.receipt.url,
      })

      setPaymentInfo({
        orderName: payments.orderName,
        method: payments.method,
        totalAmount: payments.totalAmount,
        approvedAt: format(
          new Date(payments.approvedAt),
          'yyyy/MM/dd HH:mm:ss'
        ),
        receipt: payments.receipt.url,
      })
    }
  }, [basicToken, searchParams?.orderId, url])

  useEffect(() => {
    completePayments()
  }, [completePayments])

  return (
    <main
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <div
        css={{
          border: '1px solid #15c9de',
          padding: '20px',
          borderRadius: '8px',
        }}
      >
        <h1>결제 성공</h1>
        <CSText size={16} color={'black'} lineHeight={1.21} marginTop={10}>
          주문: {paymentInfo.orderName}
        </CSText>
        <CSText size={16} color={'black'} lineHeight={1.21}>
          결제 수단: {paymentInfo.method}
        </CSText>
        <CSText size={16} color={'black'} lineHeight={1.21}>
          결제 금액: {paymentInfo.totalAmount}원
        </CSText>
        <CSText size={16} color={'black'} lineHeight={1.21}>
          결제 일시:
          {paymentInfo.approvedAt}
        </CSText>
        <CSText
          size={16}
          color={'black'}
          lineHeight={1.21}
          marginTop={10}
          fontFamily={'PretendardBold'}
        >
          영수증은 주문내역에서 확인 가능합니다.
        </CSText>
        <CSText
          size={16}
          color={'black'}
          lineHeight={1.21}
          fontFamily={'PretendardBold'}
        >
          현금 영수증은 매장으로 문의해주세요.
        </CSText>
      </div>
    </main>
  )
}

export default PaymentsRedirect
