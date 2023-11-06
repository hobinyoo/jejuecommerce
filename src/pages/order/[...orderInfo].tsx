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
import AutoSizeImage from '@components/cs/AutoSizeImage'
import CSSpan from '@components/cs/CSSpan'
import { calculateTotalPrice } from 'src/function/calculateTotalPrice'
import { menuData } from 'src/constants/products'

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

  const quantityArr = orderInfo![0].split(',').map((str) => Number(str))

  const newData = menuData.map((item, index) => ({
    title: item.title,
    price: item.price,
    quantity: quantityArr[index],
  }))

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
        <CSText
          size={24}
          fontFamily={'PretendardBold'}
          color={'#000'}
          lineHeight={0.83}
        >
          주문하기
        </CSText>
        <CSText size={15} color={'#818181'} lineHeight={1.22} marginTop={12}>
          달인의 가마솥을 집에서 편하게 만나보세요!
        </CSText>
        <div
          css={{
            padding: `${getSize(20)}px ${getSize(20)}px ${getSize(
              0
            )}px ${getSize(20)}px`,
            border: '1px solid #ececec',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            marginTop: `${getSize(40)}px `,
          }}
        >
          <CSText
            size={12}
            fontFamily={'PretendardBold'}
            color={'#000'}
            lineHeight={1.17}
          >
            주문 상품
          </CSText>
          {newData.map((menu, index) => (
            <div key={index}>
              {menu.quantity !== 0 && (
                <div
                  css={{
                    display: 'flex',
                    gap: `${getSize(10)}px`,
                    paddingTop: `${getSize(15)}px`,
                    paddingBottom: `${getSize(14)}px`,
                    borderBottom:
                      newData.length - 1 === index
                        ? 'none'
                        : 'solid 1px #ececec',
                  }}
                >
                  <div>
                    <AutoSizeImage
                      src={'/images/orderMenu1.png'}
                      width={getSize(40)}
                      height={getSize(40)}
                    />
                  </div>
                  <div
                    css={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <CSText size={13} color={'#000'} lineHeight={1.15}>
                      {menu.title}
                    </CSText>
                    <CSText size={13} color={'#000'} lineHeight={1.15}>
                      {menu.price}
                      <span css={line} />
                      <CSSpan size={13} color={'#000'} lineHeight={1.15}>
                        수량 {menu.quantity}개
                      </CSSpan>
                    </CSText>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div
          css={{
            padding: `${getSize(18)}px ${getSize(16)}px`,
            borderLeft: '1px solid #ececec',
            borderRight: '1px solid #ececec',
            borderBottom: '1px solid #ececec',
            borderBottomLeftRadius: '8px',
            borderBottomRightRadius: '8px',
          }}
        >
          <div css={{ display: 'flex', justifyContent: 'space-between' }}>
            <CSText size={12} color={'#818181'} lineHeight={1.67}>
              총 결제 금액
            </CSText>
            <CSText
              size={15}
              color={'#15c9de'}
              lineHeight={1.2}
              fontFamily={'PretendardBold'}
            >
              {calculateTotalPrice(quantityArr)}원
            </CSText>
          </div>
        </div>
      </div>

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
        quantity={quantityArr}
        totalPrice={calculateTotalPrice(quantityArr)}
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
`
const line = css`
  width: 1px;
  height: 10px;
  border: 1px solid #ececec;
  margin-left: 8px;
  margin-right: 8px;
`
export default Order
