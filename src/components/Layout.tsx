import React, { ReactNode } from 'react'
import { css } from '@emotion/react'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return <div css={container}>{children}</div>
}

const container = css`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100); ;
`

export default Layout
