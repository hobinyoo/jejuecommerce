import MainHeader from '@components/cs/MainHeader'
import OrderModal from '@components/modal/OrderModal'
import { css } from '@emotion/react'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import React, { useEffect, useState } from 'react'
import nookies from 'nookies'
import MainSection from '@components/main/MainSection'
import MenuPointSection from '@components/main/MenuPointSection'
import MethodSection from '@components/main/MethodSection'
import ChangeRefundSection from '@components/main/ChangeRefundSection'
import NotationsSection from '@components/main/NotationsSection'
import SellerInfoSection from '@components/main/SellerInfoSection'
import ReviewSection from '@components/main/ReviewSection'
import Button from '@components/cs/Button'
import NotiModal from '@components/modal/NotiModal'
import { isEmpty } from 'lodash'
import OrderDetailModal from '@components/modal/OrderDetailModal'
import AutoSizeImage from '@components/cs/AutoSizeImage'
import HistoryEffect from '@components/main/HistoryEffect'
import IntroMenuSection from '@components/main/IntroMenuSection'
import SafePolicy from '@components/main/SafePolicy'
import PackageMethod from '@components/main/PackageMethod'
import dynamic from 'next/dynamic'
import CSText from '@components/cs/CSText'

const StartPage = dynamic(() => import('@components/main/StartPage'))

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx)

    return {
      props: { cookies },
    }
  } catch (err) {
    console.log(err)

    ctx.res.writeHead(302, { Location: '/signIn' })
    ctx.res.end()

    return { props: {} as never }
  }
}

const Main = ({
  cookies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [orderVisible, setOrderVisible] = useState<boolean>(false)
  const [orderDetailVisible, setOrderDetailVisible] = useState<boolean>(false)
  const [notiVisible, setNotiVisible] = useState<boolean>(false)

  const [startEnabled, setStartEnabled] = useState<string | null>(
    cookies.coupon ?? ''
  )

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (startEnabled) {
        nookies.set(undefined, 'coupon', startEnabled, { path: '/' })
      }
    }
  }, [startEnabled])

  return (
    <>
      {startEnabled !== 'noShow' ? (
        <StartPage setStartEnabled={setStartEnabled} />
      ) : (
        <div
          css={[
            container,
            {
              width: '100%',
              marginBottom: '2rem',
              marginLeft: 'auto',
              marginRight: 'auto',
              position: orderVisible ? 'fixed' : undefined,
            },
          ]}
        >
          <MainHeader
            uid={cookies?.uid}
            setOrderDetailVisible={setOrderDetailVisible}
          />

          <MainSection />
          <div css={{ marginBottom: '-0.3rem' }}>
            <AutoSizeImage src={'/images/jejupic.png'} full />
          </div>
          <HistoryEffect />
          <IntroMenuSection />
          <MenuPointSection />
          <MethodSection />
          <SafePolicy />
          <div css={{ position: 'relative' }}>
            <AutoSizeImage full src={'/images/gamasot.gif'} priority />
            <div
              css={{
                position: 'absolute',
                width: '70%',
                backgroundColor: 'rgba(0,0,0,0.3)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <CSText
                size={2.4}
                fontFamily={'SeoulHangangEB'}
                color={'#fff'}
                lineHeight={1}
              >
                {`요리에 진심인 쉐프가\n 전통 가마솥 방식으로 \n 맛 좋은 먹거리를 만듭니다`}
              </CSText>
            </div>
          </div>

          <PackageMethod />
          <ChangeRefundSection />
          <NotationsSection />
          <SellerInfoSection />
          <ReviewSection />

          <div css={[buttonWrapper, { width: '100%' }]}>
            <Button
              onClick={() =>
                isEmpty(cookies.uid)
                  ? setNotiVisible(true)
                  : setOrderVisible(true)
              }
              btnHeight={5}
              backgroundColor={'#15c9de'}
              fontSize={1.7}
              fontColor="#fff"
              borderColor={'#15c9de'}
            >
              구매하기
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
              uid={cookies.uid}
              orderVisible={orderVisible}
              setOrderVisible={setOrderVisible}
            />
          )}

          {orderDetailVisible && (
            <OrderDetailModal setOrderDetailVisible={setOrderDetailVisible} />
          )}
        </div>
      )}
    </>
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
