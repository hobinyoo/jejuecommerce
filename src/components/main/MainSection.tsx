import AutoSizeImage from '@components/cs/AutoSizeImage'
import CSText from '@components/cs/CSText'
import { css } from '@emotion/react'
import React from 'react'

const MainSection = () => {
  return (
    <div css={container}>
      <AutoSizeImage src={'/images/mainImg.png'} full priority />
      <CSText
        size={2.4}
        fontFamily={'SeoulHangangEB'}
        color={'#3e3737'}
        lineHeight={0.83}
        marginTop={3}
        textAlignCenter
      >
        달인의 가마솥 한우곰탕
      </CSText>
      <CSText
        size={1.3}
        color={'#9e9795'}
        marginTop={2}
        lineHeight={1.38}
        textAlignCenter
      >
        {`집에서도 즐기는 달인의 가마솥\n  #한우곰탕 #한우설렁탕 #육우갈비탕`}
      </CSText>
    </div>
  )
}

const container = css`
  width: 100%;
  justify-content: center;
  margin-bottom: 3rem;
  text-align: center;
  white-space: pre-line;
`

export default MainSection
