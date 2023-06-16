import Button from '@components/Button'
import Header from '@components/MainHeader'
import Review from '@components/Review'
import OrderModal from '@components/modal/OrderModal'
import { css } from '@emotion/react'
import { auth } from '@firebase/initFirebase'
import React, { useState } from 'react'

const Main = () => {
  const [orderVisible, setOrderVisible] = useState<boolean>(false)
  const test = auth.currentUser

  return (
    <div css={container}>
      <Header />
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
