import React, { ReactNode } from 'react'
import { css } from '@emotion/react'

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return <div css={container}>{children}</div>
}

const container = css`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100); ;
`

export default Layout
