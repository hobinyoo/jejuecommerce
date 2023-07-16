import MainHeader from '@components/cs/MainHeader'
import OrderModal from '@components/modal/OrderModal'
import { css } from '@emotion/react'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import React, { useEffect, useState } from 'react'
import nookies from 'nookies'
import { RootState, useAppDispatch, useAppSelector } from 'src/store'
import { setWindowSize } from 'src/store/features/windowSizeSlice'
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
  const dispatch = useAppDispatch()
  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )
  const [orderVisible, setOrderVisible] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window === 'object') {
      const handleResize = () => {
        dispatch(
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          })
        )
      }
      handleResize() // 컴포넌트가 처음 마운트될 때 초기 윈도우 크기 설정
      window.addEventListener('resize', handleResize) // 윈도우 크기 변경 이벤트 처리
      return () => {
        window.removeEventListener('resize', handleResize) // 컴포넌트 언마운트 시 이벤트 리스너 제거
      }
    }
  }, [dispatch])

  return (
    <div css={[container, { width: width > 500 ? '500px' : '100%' }]}>
      <MainHeader windowWidth={width} windowHeight={height} uid={user.uid} />
      <div css={{ backgroundColor: '#fffcf7' }}>
        <MainSection />
        <Line />
        <StrengthSection />
        <StrengthTwoSection />
        <MenuPointSection />
        <MethodSection />
        <DeliveryInformSection />
        <Line />
        <ChangeRefundSection />
        <Line />
        <NotationsSection />
        <Line />
        <SellerInfoSection />
        <Line />
        <ReviewSection />
      </div>

      {/* <Button onClick={() => setOrderVisible(true)}>주문하기</Button> */}

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
`

export default Main
