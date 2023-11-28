import React, { ReactNode, useState, useEffect } from 'react'
import { css } from '@emotion/react'

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  const [deviceType, setDeviceType] = useState<string>('mobile')

  useEffect(() => {
    const userAgent = navigator.userAgent
    if (
      /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/.test(
        userAgent
      )
    ) {
      setDeviceType('mobile')
    } else {
      setDeviceType('desktop')
    }
  }, [])

  return (
    <>
      {deviceType === 'mobile' ? (
        <div css={container}>{children}</div>
      ) : (
        <div>모바일 환경에서 실행해주세요.</div>
      )}
    </>
  )
}

const container = css`
  width: 100%;
  height: 100%;
  /* height: calc(var(--vh, 1vh) * 100); ; */
`

export default Layout
