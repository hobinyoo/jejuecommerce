import Button from '@components/Button'
import MainHeader from '@components/MainHeader'
import Review from '@components/Review'
import OrderModal from '@components/modal/OrderModal'
import { css } from '@emotion/react'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import React, { useState } from 'react'
import nookies from 'nookies'

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

    // `as never` prevents inference issues
    // with InferGetServerSidePropsType.
    // The props returned here don't matter because we've
    // already redirected the user.
    return { props: {} as never }
  }
}

const Main = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [orderVisible, setOrderVisible] = useState<boolean>(false)

  return (
    <div css={container}>
      <MainHeader uid={user.uid} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>main</div>
        <div>후기</div>
        <Review />
      </div>

      <Button onClick={() => setOrderVisible(true)} bottom>
        주문하기
      </Button>

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
  width: 100%;
  height: 100vh;
`

export default Main
