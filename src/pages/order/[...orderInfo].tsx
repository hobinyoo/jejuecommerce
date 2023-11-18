import InputText from '@components/cs/InputText'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import nookies from 'nookies'

import MainHeader from '@components/cs/MainHeader'
import { useAppSelector, RootState } from 'src/store'
import { toSize } from 'styles/globalStyle'
import CSText from '@components/cs/CSText'
import { isEmpty } from 'lodash'
import ErrorMessage from '@components/Error'
import { nameValidation, phoneValidation } from 'src/function/vaildation'
import Button from '@components/cs/Button'
import PostModal from '@components/modal/PostModal'
import { calculateTotalPrice } from 'src/function/calculateTotalPrice'
import OrderMenu from '@components/order-menu/OrderMenu'
import { getBaseUrl } from 'src/utils/url'
import dynamic from 'next/dynamic'

const Payments = dynamic(import('@components/payments/Payments'))

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const user = nookies.get(ctx)

    const res = await fetch(`${getBaseUrl}/api/get-oneUserInfo?id=${user.uid}`)
    let data = await res.json()
    data.uid = user.uid

    return {
      props: { data },
    }
  } catch (err) {
    console.log(err)

    ctx.res.writeHead(302, { Location: '/' })
    ctx.res.end()

    return { props: {} as never }
  }
}

const Order = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()

  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )
  const getSize = (input: number) => {
    return toSize(width, height, input)
  }

  const [uid, setUid] = useState<string>(data.uid)
  const [name, setName] = useState<string>(data?.items?.name ?? '')
  const [phoneNumber, setPhoneNumber] = useState<string>(
    data?.items?.phoneNumber ?? ''
  )
  const [address, setAddress] = useState<string>(data?.items?.address ?? '')
  const [addressDetail, setAddressDetail] = useState<string>(
    data?.items?.addressDetail ?? ''
  )
  const [postCode, setPostCode] = useState<string>(data?.items?.postCode ?? '')
  const [carrierRequest, setCarrierRequest] = useState<string>('')

  const [postVisible, setPostVisible] = useState<boolean>(false)
  const { orderInfo } = router.query

  const quantityArr = orderInfo![0].split(',').map((str) => Number(str))

  const handle = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setPostVisible(true)
    },

    // 주소 선택 이벤트
    selectAddress: (data: any) => {
      setAddress(data.address)
      setPostCode(data.zonecode)
      setPostVisible(false)
    },
  }

  return (
    <div css={container}>
      <MainHeader windowWidth={width} windowHeight={height} uid={''} />
      <div css={{ padding: `0 ${getSize(20)}px` }}>
        <CSText size={24} fontFamily={'PretendardBold'} lineHeight={0.83}>
          주문하기
        </CSText>
        <CSText
          size={15}
          color={'#818181'}
          lineHeight={1.22}
          marginTop={12}
          marginBottom={40}
        >
          달인의 가마솥을 집에서 편하게 만나보세요!
        </CSText>
        <OrderMenu quantityArr={quantityArr} uid={data.uid} />
        <div>
          <CSText
            size={15}
            fontFamily={'PretendardBold'}
            lineHeight={1.22}
            marginTop={20}
            marginBottom={5}
          >
            받는 사람
          </CSText>
          <CSText size={13} marginTop={30} marginBottom={8} lineHeight={1.15}>
            이름
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
          <CSText size={13} marginTop={30} marginBottom={8} lineHeight={1.15}>
            휴대폰 번호
          </CSText>
          <InputText
            name="name"
            placeholder="이름을 입력해주세요."
            setInputText={setPhoneNumber}
            inputText={phoneNumber}
          />
          {!isEmpty(phoneNumber) && !phoneValidation(phoneNumber) && (
            <ErrorMessage message={'올바른 번호를 입력해주세요'} />
          )}
          <CSText size={13} marginTop={30} marginBottom={8} lineHeight={1.15}>
            주소
          </CSText>
          <div css={findAddress}>
            <InputText
              name="postCode"
              placeholder="우편 번호"
              setInputText={setPostCode}
              inputText={postCode}
              signUpCertification
            />

            <Button
              onClick={handle.clickButton}
              btnWidth={100}
              btnHeight={46}
              backgroundColor="#fff"
              borderColor="#15c9de"
              fontColor="#15c9de"
              fontSize={14}
              borderRadius={4}
            >
              주소 찾기
            </Button>
          </div>
          <InputText
            name="address"
            placeholder=""
            setInputText={setAddress}
            inputText={address}
            marginTop={10}
          />
          <InputText
            name="addressDetail"
            placeholder="상세 주소"
            setInputText={setAddressDetail}
            inputText={addressDetail}
            marginTop={10}
          />
          <CSText size={13} marginTop={30} marginBottom={8} lineHeight={1.15}>
            배송시 요청사항
          </CSText>
          <InputText
            name="carrierRequest"
            placeholder="배송시 요청사항을 입력해주세요."
            setInputText={setCarrierRequest}
            inputText={carrierRequest}
          />
        </div>
      </div>

      {postVisible && (
        <PostModal
          setPostVisible={setPostVisible}
          setAddress={setAddress}
          setPostCode={setPostCode}
        />
      )}

      <Payments
        uid={uid}
        quantity={quantityArr}
        totalPrice={
          calculateTotalPrice(quantityArr, 0) > 70000
            ? calculateTotalPrice(quantityArr, 0, uid)
            : calculateTotalPrice(quantityArr, 4000, uid)
        }
        name={name}
        phoneNumber={phoneNumber}
        address={address}
        addressDetail={addressDetail}
        postCode={postCode}
        carrierRequest={carrierRequest}
      />
    </div>
  )
}

const container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`

const findAddress = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`

export default Order
