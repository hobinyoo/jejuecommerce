import MainHeader from '@components/cs/MainHeader'
import OrderModal from '@components/modal/OrderModal'
import { css } from '@emotion/react'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import React, { useState } from 'react'
import nookies from 'nookies'
import { RootState, useAppSelector } from 'src/store'
import MainSection from '@components/main/MainSection'
import Line from '@components/cs/Line'
import DeliveryInformSection from '@components/main/DeliveryInformSection'
import MenuPointSection from '@components/main/MenuPointSection'
import MethodSection from '@components/main/MethodSection'
import ChangeRefundSection from '@components/main/ChangeRefundSection'
import NotationsSection from '@components/main/NotationsSection'
import SellerInfoSection from '@components/main/SellerInfoSection'
import ReviewSection from '@components/main/ReviewSection'
import Button from '@components/cs/Button'
import { toSize } from 'styles/globalStyle'
import NotiModal from '@components/modal/NotiModal'
import { isEmpty } from 'lodash'
import OrderDetailModal from '@components/modal/OrderDetailModal'
import AutoSizeImage from '@components/cs/AutoSizeImage'
import CSText from '@components/cs/CSText'
import HistoryEffection from '@components/main/HistoryEffection'
import IntroMenuSection from '@components/main/IntroMenuSection'

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
  const [orderDetailVisible, setOrderDetailVisible] = useState<boolean>(false)
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
      <MainHeader
        windowWidth={width}
        windowHeight={height}
        uid={user.uid}
        setOrderDetailVisible={setOrderDetailVisible}
      />
      <MainSection />
      <AutoSizeImage
        src={'/images/jejupic.png'}
        width={getSize(360)}
        height={getSize(240)}
      />
      <div css={{ backgroundColor: 'yellow' }}>영상</div>
      <div
        css={{
          width: '100%',
          height: `${getSize(100)}px`,
          backgroundColor: 'black',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <CSText size={12} color={'#fffcf7'} lineHeight={1.33}>
          {'달인의 가마솥 브랜드 설명 \n 가게 소개 세줄 \n  가게 소개 세줄'}
        </CSText>
        <CSText size={12} color={'#fffcf7'} lineHeight={1.33}>
          {'달인의 가마솥 브랜드 설명 \n  가게 소개 세줄'}
        </CSText>
        <CSText size={12} color={'#fffcf7'} lineHeight={1.33}>
          {'달인의 가마솥 브랜드 설명 \n 가게 소개 세줄 \n  가게 소개 세줄'}
        </CSText>
      </div>

      <HistoryEffection />
      <IntroMenuSection />
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
          backgroundColor={'#15c9de'}
          fontSize={17}
          fontColor={'#fff'}
          borderColor={'#15c9de'}
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

      {orderDetailVisible && (
        <OrderDetailModal setOrderDetailVisible={setOrderDetailVisible} />
      )}
    </div>
  )
}

const container = css`
  height: 100%;
  display: 'flex';
  flex-direction: column;
  background-color: #fff;
`

const buttonWrapper = css`
  position: fixed;
  bottom: 0;
  z-index: 2;
`
export default Main
