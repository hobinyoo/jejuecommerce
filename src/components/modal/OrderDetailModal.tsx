import Button from '@components/cs/Button'
import React, { Dispatch, SetStateAction, useState } from 'react'
import IconX from '/public/X.svg'
import { useAppDispatch } from 'src/store'
import { modalContainer, modalOverlay } from 'styles/globalStyle'
import CSText from '@components/cs/CSText'
import { useRouter } from 'next/router'
import InputText from '@components/cs/InputText'
import { isEmpty } from 'lodash'
import CSSpan from '@components/cs/CSSpan'
import { setOrdersInfo } from 'src/store/features/paymentSlice'

interface Props {
  setOrderDetailVisible: Dispatch<SetStateAction<boolean>>
}

const OrderDetailModal = ({ setOrderDetailVisible }: Props) => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const [name, setName] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')

  const handle = {
    signIn: () => {
      router.push('signIn')
      setOrderDetailVisible(false)
    },
    orderDetail: () => {
      //TODO: 데이터가 있으면 배열에 담아서 redirect로 params에 데이터 보내고 없으면 message로 정보 없다고 전달!
      fetch('/api/get-notUserInfo', {
        method: 'POST',
        body: JSON.stringify({
          name: name,
          phoneNumber: phoneNumber,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (isEmpty(data.items)) {
            alert('해당 정보를 찾을 수 없습니다.')
          }

          dispatch(setOrdersInfo(data.items))
          router.push('/orderDetail')
        })
        .catch((error) => console.error(error))
    },
  }

  return (
    <div css={modalOverlay}>
      <div
        css={[
          modalContainer,
          {
            padding: '2rem',
            width: '30rem',
            height: '40rem',
            borderRadius: '1.2rem',
          },
        ]}
      >
        <div
          css={{
            position: 'absolute',
            top: '2rem',
            right: '2rem',
          }}
        >
          <IconX onClick={() => setOrderDetailVisible(false)} />
        </div>
        <div>
          <CSText
            size={1.5}
            fontFamily={'PretendardBold'}
            lineHeight={1.25}
            marginTop={3}
          >
            비회원 주문
          </CSText>
          <CSText size={1.3} marginTop={3} marginBottom={0.8} lineHeight={1.15}>
            이름
          </CSText>
          <InputText
            name="name"
            placeholder="이름을 입력해주세요."
            setInputText={setName}
            inputText={name}
          />

          <CSText size={1.3} marginTop={3} marginBottom={0.8} lineHeight={1.15}>
            휴대폰 번호
          </CSText>
          <div>
            <InputText
              name="phoneNumber"
              placeholder="휴대폰 번호를 입력해주세요."
              setInputText={setPhoneNumber}
              inputText={phoneNumber}
            />
          </div>
          <Button
            onClick={handle.orderDetail}
            btnHeight={5}
            fontSize={1.7}
            fontColor="#fff"
            marginTop={2}
            backgroundColor="#15c9de"
            borderColor="#15c9de"
          >
            주문내역 확인
          </Button>
        </div>
        <div css={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CSText
            onClick={handle.signIn}
            size={1.2}
            marginTop={3}
            lineHeight={1.15}
          >
            회원이신가요?{' '}
            <CSSpan
              size={1.2}
              lineHeight={1.15}
              textDecoration
              onClick={() => router.push('/signIn')}
            >
              로그인하러 가기
            </CSSpan>
          </CSText>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailModal
