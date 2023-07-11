import React from 'react'
import { loadTossPayments } from '@tosspayments/payment-sdk'
import Button from '@components/cs/Button'
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from 'src/firebase/initFirebase'
import { PayMentsProps } from 'types/types'

const PayMents = ({
  uid,
  menu,
  quantity,
  totalPrice,
  phoneNumber,
  name,
  address,
  addressDetail,
  postCode,
}: PayMentsProps) => {
  const orderId = Math.random().toString(36).slice(2)

  const handleClick = async () => {
    const tossPayments = await loadTossPayments(
      'test_ck_XjExPeJWYVQNYYg1yqxr49R5gvNL'
    )

    await updateDoc(doc(db, 'users', uid), {
      address: address,
      addressDetail: addressDetail,
      postCode: postCode,
    })

    await setDoc(doc(db, 'orders', orderId), {
      uid: uid,
      menu: menu,
      quantity: quantity,
      totalPrice: totalPrice,
      name: name,
      phoneNumber: phoneNumber,
      address: address,
      addressDetail: addressDetail,
      postCode: postCode,
      status: '상품준비',
      timestamp: new Date(),
    })

    //TODO: fail시 orderId 값 삭제하고 주문페이지로 돌아가자
    //첫번째 인자값은 결제 방법
    await tossPayments.requestPayment('카드', {
      amount: totalPrice,
      orderId: orderId,
      orderName: menu,
      successUrl: `${window.location.origin}/api/payments`,
      failUrl: `${window.location.origin}/api/paymentsFail`,
    })
  }
  return (
    <Button onClick={handleClick} bottom>
      결제하기
    </Button>
  )
}

export default PayMents
