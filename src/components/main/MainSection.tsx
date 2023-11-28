import AutoSizeImage from '@components/cs/AutoSizeImage'
import { css } from '@emotion/react'
import React from 'react'

const MainSection = () => {
  return (
    <div css={container}>
      <AutoSizeImage src={'/images/mainImg.png'} full priority />
    </div>
  )
}

const container = css`
  width: 100%;
  margin-bottom: -0.3rem;
`

export default MainSection
