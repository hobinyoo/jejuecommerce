import Button from '@components/cs/Button'
import Header from '@components/cs/MainHeader'
import OrderModal from '@components/modal/OrderModal'
import { css } from '@emotion/react'
import React, { useState } from 'react'

const Main = () => {
  const [orderVisible, setOrderVisible] = useState<boolean>(false)
  return (
    <div css={container}>
      <Header />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>main</div>
        <div>후기</div>
      </div>

      <Button onClick={() => setOrderVisible(true)} order>
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
  position: relative;
`

export default Main
