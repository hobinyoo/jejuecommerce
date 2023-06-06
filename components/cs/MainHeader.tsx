import React, { useState } from 'react'
import { css } from '@emotion/react'
import MenuDrawer from '../navigation/Drawer'

const MainHeader = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)

  return (
    <div css={container}>
      <p>로고</p>
      <MenuDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </div>
  )
}

const container = css`
  width: 100%;
  padding: 1.5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export default MainHeader
