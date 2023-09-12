import MainHeader from '@components/cs/MainHeader'
import OrderModal from '@components/modal/OrderModal'
import { css } from '@emotion/react'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import React, { useState } from 'react'
import nookies from 'nookies'
import { RootState, useAppSelector } from 'src/store'
import MainSection from '@components/main/MainSection'
import Line from '@components/cs/Line'
import StrengthSection from '@components/main/StrengthSection'
import DeliveryInformSection from '@components/main/DeliveryInformSection'
import MenuPointSection from '@components/main/MenuPointSection'
import MethodSection from '@components/main/MethodSection'
import StrengthTwoSection from '@components/main/StrengthTwoSection'
import ChangeRefundSection from '@components/main/ChangeRefundSection'
import NotationsSection from '@components/main/NotationsSection'
import SellerInfoSection from '@components/main/SellerInfoSection'
import ReviewSection from '@components/main/ReviewSection'
import Button from '@components/cs/Button'
import { toSize } from 'styles/globalStyle'
import NotiModal from '@components/modal/NotiModal'
import { isEmpty } from 'lodash'
import { or } from 'firebase/firestore'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const user = nookies.get(ctx)
    return {
      props: { user },
    }
  } catch (err) {
    console.log(err)

    ctx.res.writeHead(302, { Location: '/signIn' })
    ctx.res.end()

    return { props: {} as never }
  }
}

const Main = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )
  const [orderVisible, setOrderVisible] = useState<boolean>(false)
  const [notiVisible, setNotiVisible] = useState<boolean>(false)

  const getSize = (input: number) => {
    return toSize(width, height, input)
  }

  return (
    <div
      css={[
        container,
        {
          width: width > 500 ? '500px' : '100%',
          marginBottom: `${getSize(60)}px`,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      ]}
    >
      <MainHeader windowWidth={width} windowHeight={height} uid={user.uid} />
      <MainSection />
      <Line backgroundColor={'#f5f0e8'} />
      <StrengthSection />
      <StrengthTwoSection />
      <MenuPointSection />
      <MethodSection />
      <DeliveryInformSection />
      <Line backgroundColor={'#f5f0e8'} />
      <ChangeRefundSection />
      <Line backgroundColor={'#f5f0e8'} />
      <NotationsSection />
      <Line backgroundColor={'#f5f0e8'} />
      <SellerInfoSection />
      <Line backgroundColor={'#f5f0e8'} />
      <ReviewSection />

      <div css={[buttonWrapper, { width: width > 500 ? '500px' : '100%' }]}>
        <Button
          onClick={() =>
            isEmpty(user.uid) ? setNotiVisible(true) : setOrderVisible(true)
          }
          btnHeight={50}
          backgroundColor={'#000'}
          fontSize={17}
          fontColor={'#fff'}
        >
          {'구매하기'}
        </Button>
      </div>

      {notiVisible && (
        <NotiModal
          setNotiVisible={setNotiVisible}
          setOrderVisible={setOrderVisible}
        />
      )}

      {orderVisible && (
        <OrderModal
          uid={user.uid}
          orderVisible={orderVisible}
          setOrderVisible={setOrderVisible}
        />
      )}
    </div>
  )
}

const container = css`
  height: 100%;
  display: 'flex';
  flex-direction: column;
  background-color: #fffcf7;
`

const buttonWrapper = css`
  position: fixed;
  bottom: 0;
  z-index: 2;
`
export default Main
