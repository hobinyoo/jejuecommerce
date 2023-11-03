import InputText from '@components/cs/InputText'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import nookies from 'nookies'
import PayMents from '../payments'
import MainHeader from '@components/cs/MainHeader'
import { useAppSelector, RootState } from 'src/store'
import { toSize } from 'styles/globalStyle'
import CSText from '@components/cs/CSText'
import Line from '@components/cs/Line'
import { isEmpty } from 'lodash'
import ErrorMessage from '@components/Error'
import { nameValidation, phoneValidation } from 'src/function/vaildation'
import Button from '@components/cs/Button'
import PostModal from '@components/modal/PostModal'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const user = nookies.get(ctx)
    const res = await fetch(
      `http://localhost:3000/api/get-oneUserInfo?id=${user.uid}`
    )
    let data = await res.json()
    data.uid = user.uid
    return {
      props: { data },
    }
  } catch (err) {
    console.log(err)

    ctx.res.writeHead(302, { Location: '/signIn' })
    ctx.res.end()

    return { props: {} as never }
  }
}
const meneData = [
  {
    title: '한우곰탕',
    price: '12,000원',
  },
  {
    title: '한우설렁탕',
    price: '13,000원',
  },
  {
    title: '육우 갈비탕',
    price: '15,000원',
  },
  {
    title: '육우곰탕',
    price: '18,000원',
  },
]

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
  const [name, setName] = useState<string>(data.items?.name ?? '')
  const [phoneNumber, setPhoneNumber] = useState<string>(
    data.items?.phoneNumber ?? ''
  )
  const [address, setAddress] = useState<string>(data.items?.address ?? '')
  const [addressDetail, setAddressDetail] = useState<string>(
    data.items?.addressDetail ?? ''
  )
  const [postCode, setPostCode] = useState<string>(data.items?.postCode ?? '')
  const [carrierRequest, setCarrierRequest] = useState<string>('')

  const [postVisible, setPostVisible] = useState<boolean>(false)
  const { orderInfo } = router.query

  const newData = meneData.map((item, index) => ({
    title: item.title,
    price: item.price,
    quantity: orderInfo && orderInfo[0].split(',')[index],
  }))
  console.log(newData)
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

  const product = [
    { title: '상품명', content: orderInfo && orderInfo[0] },
    { title: '수량', content: `${orderInfo && orderInfo[1]}개` },
    {
      title: '제품가격',
      content: `${Number(orderInfo && orderInfo[1]) * 11000}원`,
    },
    { title: '배송비', content: '3000원' },
  ]

  return (
    <div css={container}>
      <MainHeader windowWidth={width} windowHeight={height} uid={''} />
      <div css={{ padding: `0 ${getSize(20)}px` }}>
        <CSText
          size={15}
          fontFamily={'PretendardBold'}
          color={'#000'}
          lineHeight={1.22}
          marginTop={20}
          marginBottom={5}
        >
          {'주문 상품'}
        </CSText>
        {product.map(({ title, content }, index) => {
          return (
            <div
              key={index}
              css={[orderProduct, { marginTop: `${getSize(15)}px` }]}
            >
              <CSText
                size={15}
                color={'#8b8b8b'}
                lineHeight={1.2}
                marginBottom={5}
              >
                {title}
              </CSText>

              <CSText
                size={15}
                fontFamily={'PretendardBold'}
                color={'#000'}
                lineHeight={1.2}
                marginBottom={5}
              >
                {content}
              </CSText>
            </div>
          )
        })}
        <div
          css={[
            totalPrice,
            {
              marginTop: `${getSize(15)}px`,
              paddingTop: `${getSize(15)}px`,
              paddingBottom: `${getSize(20)}px`,
            },
          ]}
        >
          <CSText size={15} color={'#8b8b8b'} lineHeight={1.2} marginBottom={5}>
            {'총 가격'}
          </CSText>

          <CSText
            size={15}
            fontFamily={'PretendardBold'}
            color={'#000'}
            lineHeight={1.2}
            marginBottom={5}
          >
            {!isEmpty(data.items?.email)
              ? (Number(orderInfo && orderInfo[1]) * 11000 + 3000) * 0.9
              : Number(orderInfo && orderInfo[1]) * 11000 + 3000}
            원
          </CSText>
        </div>
      </div>
      <Line backgroundColor={'#f6f6f6'} />
      <div
        css={{
          padding: `0 ${getSize(20)}px`,
        }}
      >
        <CSText
          size={15}
          fontFamily={'PretendardBold'}
          color={'#000'}
          lineHeight={1.22}
          marginTop={20}
          marginBottom={5}
        >
          {'받는 사람'}
        </CSText>
        <CSText
          size={13}
          color={'#000'}
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
          color={'#000'}
          marginTop={30}
          marginBottom={8}
          lineHeight={1.15}
        >
          {'휴대폰 번호'}
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
        <CSText
          size={13}
          color={'#000'}
          marginTop={30}
          marginBottom={8}
          lineHeight={1.15}
        >
          {'주소'}
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
            backgroundColor={'#fff'}
            fontColor={'#000'}
            fontSize={14}
            borderRadius={4}
          >
            {'주소 찾기'}
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
        <CSText
          size={13}
          color={'#000'}
          marginTop={30}
          marginBottom={8}
          lineHeight={1.15}
        >
          {'배송시 요청사항'}
        </CSText>
        <InputText
          name="carrierRequest"
          placeholder="배송시 요청사항을 입력해주세요."
          setInputText={setCarrierRequest}
          inputText={carrierRequest}
        />
      </div>
      {postVisible && (
        <PostModal
          setPostVisible={setPostVisible}
          setAddress={setAddress}
          setPostCode={setPostCode}
        />
      )}

      <PayMents
        uid={data.uid ?? ''}
        menu={'한우 소고기 국밥'}
        quantity={String(orderInfo && orderInfo[1])}
        totalPrice={Number(orderInfo && orderInfo[1]) * 11000 + 3000}
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
const orderProduct = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
const totalPrice = css`
  border-top: solid 1px #ececec;
  display: flex;
  justify-content: space-between;
`
const findAddress = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

export default Order
