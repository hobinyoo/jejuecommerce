import Header from '@components/Header'
import InputText from '@components/InputText'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import DaumPostcode from 'react-daum-postcode'

import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import nookies from 'nookies'
import PayMents from '../payments'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const user = nookies.get(ctx)
    const res = await fetch(
      `http://localhost:3000/api/get-oneUserInfo?id=${user.uid}`
    )
    const data = await res.json()

    return {
      props: { data },
    }
  } catch (err) {
    console.log(err)

    ctx.res.writeHead(302, { Location: '/signIn' })
    ctx.res.end()

    // `as never` prevents inference issues
    // with InferGetServerSidePropsType.
    // The props returned here don't matter because we've
    // already redirected the user.
    return { props: {} as never }
  }
}

const Order = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()

  const [name, setName] = useState<string>(data.items.name ?? '')
  const [phoneNumber, setPhoneNumber] = useState<string>(
    data.items.phoneNumber ?? ''
  )
  const [address, setAddress] = useState<string>(data.items.address ?? '')
  const [addressDetail, setAddressDetail] = useState<string>(
    data.items.addressDetail ?? ''
  )
  const [postCode, setPostCode] = useState<string>(data.items.postCode ?? '')
  const [openPostcode, setOpenPostcode] = useState<boolean>(false)
  const { orderInfo } = router.query

  // useEffect(() => {
  //   if (user.uid) {
  //     fetch(`/api/get-oneUserInfo?id=${user.uid}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setName(data.items.name)
  //         setPhoneNumber(data.items.phoneNumber)
  //         setAddress(data.items.address ?? '')
  //         setAddressDetail(data.items.addressDetail ?? '')
  //         setPostCode(data.items.postCode ?? '')
  //       })
  //       .catch((error) => console.error(error))
  //   }
  // }, [user.uid])

  const handle = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode((current) => !current)
    },

    // 주소 선택 이벤트
    selectAddress: (data: any) => {
      setAddress(data.address)
      setPostCode(data.zonecode)
      setOpenPostcode(false)
    },
  }
  return (
    <div>
      <Header />
      <div css={container}>
        <div>상품명: {orderInfo && orderInfo[0]}</div>
        <div>수량: {orderInfo && orderInfo[1]}개</div>
        <div>총 가격: {Number(orderInfo && orderInfo[1]) * 11000} 원</div>
        <br />
        <div>받는 사람</div>
        <br />
        <div>이름:</div>
        <InputText
          name="name"
          placeholder="이름"
          setInputText={setName}
          inputText={name}
        />
        <br />
        <div>핸드폰번호:</div>
        <InputText
          name="phoneNumber"
          placeholder="핸드폰 번호"
          setInputText={setPhoneNumber}
          inputText={phoneNumber}
        />
        <br />
        <div css={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>주소: {address}</div>
          <button onClick={handle.clickButton}>주소찾기</button>
        </div>
        <div>상세주소:</div>
        <InputText
          name="addressDetail"
          placeholder="상세주소"
          setInputText={setAddressDetail}
          inputText={addressDetail}
        />
        <div>우편번호: {postCode}</div>
        {openPostcode && (
          <DaumPostcode
            onComplete={handle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
            autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
            defaultQuery="판교역로 235" // 팝업을 열때 기본적으로 입력되는 검색어
          />
        )}
      </div>
      <PayMents
        uid={typeof router.query.uid === 'string' ? router.query.uid : ''}
        menu={typeof router.query.menu === 'string' ? router.query.menu : ''}
        quantity={
          typeof router.query.quantity === 'string' ? router.query.quantity : ''
        }
        totalPrice={Number(router.query.quantity) * 11000}
        name={name}
        phoneNumber={phoneNumber}
        address={address}
        addressDetail={addressDetail}
        postCode={postCode}
      />
    </div>
  )
}

const container = css`
  display: flex;
  flex-direction: column;
`
export default Order
