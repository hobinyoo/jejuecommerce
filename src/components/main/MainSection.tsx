import AutoSizeImage from '@components/cs/AutoSizeImage'
import CSText from '@components/cs/CSText'
import { css } from '@emotion/react'
import React from 'react'
import { RootState, useAppSelector } from 'src/store'
import { toSize } from 'styles/globalStyle'

const MainSection = () => {
  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )

  const getSize = (input: number) => {
    return toSize(width, height, input)
  }

  return (
    <div
      css={[
        container,
        { marginBottom: `${getSize(30)}px`, textAlign: 'center' },
      ]}
    >
      <AutoSizeImage
        src={'/images/mainImg.png'}
        width={getSize(360)}
        height={getSize(360)}
        priority={true}
      />
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
        집에서도 즐기는 달인의 가마솥
      </CSText>
      <CSText size={1.3} color={'#9e9795'} lineHeight={1.38} textAlignCenter>
        #한우곰탕 #한우설렁탕 #육우갈비탕
      </CSText>
    </div>
  )
}

const container = css`
  width: 100%;
  justify-content: center;
`

export default MainSection
