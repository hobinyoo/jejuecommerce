import Button from '@components/cs/Button'
import React, { Dispatch, SetStateAction, useState } from 'react'
import IconX from '/public/X.svg'
import { RootState, useAppSelector } from 'src/store'
import { modalContainer, modalOverlay, toSize } from 'styles/globalStyle'
import CSText from '@components/cs/CSText'
import { useRouter } from 'next/router'
import InputText from '@components/cs/InputText'
import { isEmpty } from 'lodash'
import { nameValidation, phoneValidation } from 'src/function/vaildation'
import ErrorMessage from '@components/Error'

interface Props {
  setOrderDetailVisible: Dispatch<SetStateAction<boolean>>
}

const OrderDetailModal = ({ setOrderDetailVisible }: Props) => {
  const router = useRouter()

  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )

  const [name, setName] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const getSize = (input: number) => {
    return toSize(width, height, input)
  }
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
            padding: `${getSize(20)}px`,
            width: `${getSize(300)}px`,
            height: `${getSize(400)}px`,
            borderRadius: `${getSize(12)}px`,
          },
        ]}
      >
        <div
          css={{
            position: 'absolute',
            top: `${getSize(20)}px`,
            right: `${getSize(20)}px`,
          }}
        >
          <IconX onClick={() => setOrderDetailVisible(false)} />
        </div>
        <div>
          <CSText
            size={15}
            fontFamily={'PretendardBold'}
            color="#000"
            lineHeight={1.25}
            marginTop={30}
          >
            {'비회원 주문'}
          </CSText>
          <CSText
            size={13}
            color="#000"
            marginTop={30}
            marginBottom={8}
            lineHeight={1.15}
          >
            {'이름'}
          </CSText>
          <InputText
            name="name"
            placeholder="이름을 입력해주세요."
            setInputText={setName}
            inputText={name}
          />
          {!isEmpty(name) && !nameValidation(name) && (
            <ErrorMessage message={'2-4 글자의 이름을 입력해주세요.'} />
          )}
          <CSText
            size={13}
            color="#000"
            marginTop={30}
            marginBottom={8}
            lineHeight={1.15}
          >
            {'휴대폰 번호'}
          </CSText>
          <div>
            <InputText
              name="phoneNumber"
              placeholder="휴대폰 번호를 입력해주세요."
              setInputText={setPhoneNumber}
              inputText={phoneNumber}
            />
          </div>
          {!isEmpty(phoneNumber) && !phoneValidation(phoneNumber) && (
            <ErrorMessage message={'올바른 번호를 입력해주세요'} />
          )}
          <Button
            onClick={handle.orderDetail}
            btnHeight={50}
            backgroundColor="#000"
            fontSize={17}
            fontColor="#fff"
            marginTop={20}
          >
            {'주문내역 확인'}
          </Button>
        </div>
        <CSText
          onClick={handle.signIn}
          size={12}
          color="#000"
          marginTop={30}
          marginBottom={8}
          lineHeight={1.15}
        >
          {'회원이신가요? 로그인하러가기'}
        </CSText>
      </div>
    </div>
  )
}

export default OrderDetailModal
