import React from 'react'
import { loadTossPayments } from '@tosspayments/payment-sdk'
import Button from '@components/Button'
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '@firebase/initFirebase'

interface PayMentProps {
  uid: string
  menu: string
  quantity: string
  totalPrice: number
  name: string
  phoneNumber: string
  address: string
  addressDetail: string
  postCode: string
}
const PayMent = ({
  uid,
  menu,
  quantity,
  totalPrice,
  phoneNumber,
  name,
  address,
  addressDetail,
  postCode,
}: PayMentProps) => {
  //TODO: 개인 db안에 주소 정보를 입력해주어야하고 orderId를 생성하여 orders에 orderId로
  //누가 뭐를 얼마나 시켰는지 저장해주어야한다.

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
      status: '배송준비',
      timestamp: new Date(),
    })

    //TODO: fail시 orderId 값 삭제하고 주문페이지로 돌아가자
    //첫번째 인자값은 결제 방법
    await tossPayments.requestPayment('카드', {
      amount: totalPrice,
      orderId: orderId,
      orderName: menu,
      successUrl: `${window.location.origin}/api/payment`,
      failUrl: `${window.location.origin}/api/payments/fail`,
    })
  }
  return (
    <Button onClick={handleClick} order>
      결제하기
    </Button>
  )
}

export default PayMent
