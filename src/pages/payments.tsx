import React, { useEffect, useRef } from 'react'

import Button from '@components/cs/Button'
import { doc, setDoc } from 'firebase/firestore'
import { db } from 'src/firebase/initFirebase'
import { PayMentsProps } from 'types/types'
import {
  PaymentWidgetInstance,
  loadPaymentWidget,
  ANONYMOUS,
} from '@tosspayments/payment-widget-sdk'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/router'

const PayMents = ({
  email,
  menu,
  quantity,
  totalPrice,
  phoneNumber,
  name,
  address,
  addressDetail,
  postCode,
  carrierRequest,
}: PayMentsProps) => {
  const router = useRouter()

  const orderId = Math.random().toString(36).slice(2)

  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null)
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance['renderPaymentMethods']
  > | null>(null)

  useEffect(() => {
    ;(async () => {
      const paymentWidget = await loadPaymentWidget(
        'test_ck_XjExPeJWYVQNYYg1yqxr49R5gvNL',
        ANONYMOUS
      )

      // ------  결제위젯 렌더링 ------
      // https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        '#payment-widget',
        { value: totalPrice }
      )

      // ------  이용약관 렌더링 ------
      // https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자
      paymentWidget.renderAgreement('#agreement')

      paymentWidgetRef.current = paymentWidget
      paymentMethodsWidgetRef.current = paymentMethodsWidget
    })()
  }, [totalPrice])

  const handleClick = async () => {
    const paymentWidget = paymentWidgetRef.current

    const paymentAgreement = paymentWidget
      ?.renderAgreement('#agreement')
      .getAgreementStatus().agreedRequiredTerms

    if (paymentAgreement) {
      await paymentWidget
        ?.requestPayment({
          orderId: orderId,
          orderName: menu,
          customerName: name,
          successUrl: `${window.location.origin}/api/payments`,
          failUrl: `${window.location.origin}/api/paymentsFail`,
        })
        .then(
          async () =>
            await setDoc(doc(db, 'orders', orderId), {
              menu: menu,
              quantity: quantity,
              totalPrice: totalPrice,
              name: name,
              phoneNumber: phoneNumber,
              address: address,
              addressDetail: addressDetail,
              postCode: postCode,
              carrierRequest: carrierRequest,
            })
        )
        .catch((error) => {
          // 에러 처리: 에러 목록을 확인하세요
          // https://docs.tosspayments.com/reference/error-codes#failurl로-전달되는-에러
          if (error.code === 'USER_CANCEL') {
            alert('메인화면으로 이동합니다.')
            router.push('/')
          } else if (error.code === 'INVALID_CARD_COMPANY') {
            // 유효하지 않은 카드 코드에 대한 에러 처리
            alert('카드 번호가 유효하지 않습니다. 재입력 해주세요.')
          }
        })
    } else {
      alert('필수약관에 동의해주세요.')
    }
  }
  return (
    <div>
      <div id="payment-widget" style={{ width: '100%' }} />
      <div id="agreement" style={{ width: '100%' }} />
      <Button
        onClick={handleClick}
        btnHeight={50}
        backgroundColor={'#000'}
        fontColor={'#fff'}
        fontSize={17}
      >
        결제하기
      </Button>
    </div>
  )
}

export default PayMents
