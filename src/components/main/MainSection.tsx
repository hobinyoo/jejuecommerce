import AutoSizeImage from '@components/cs/AutoSizeImage'
import CSSpan from '@components/cs/CSSpan'
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
    <div css={container}>
      <AutoSizeImage
        src={'/images/main_img@3x.png'}
        width={getSize(360)}
        height={getSize(360)}
      />
      <CSText
        size={24}
        fontFamily={'PretendardBold'}
        color={'#3e3737'}
        marginTop={20}
        marginLeft={20}
        lineHeight={0.83}
      >
        한우 소고기 국밥
      </CSText>
      <CSText
        size={15}
        fontFamily={'PretendardRegular'}
        color={'#9e9795'}
        marginTop={10}
        marginLeft={20}
        lineHeight={1.33}
      >
        깊고 시원한 한우 소고기 국밥
      </CSText>
      <div css={{ display: 'flex' }}>
        <CSText
          size={20}
          fontFamily={'PretendardBold'}
          color={'#3e3737'}
          marginTop={15}
          marginLeft={20}
        >
          11,000
          <CSSpan
            size={20}
            fontFamily={'PretendardRegular'}
            color={'#3e3737'}
            marginTop={15}
          >
            원
          </CSSpan>
          <CSSpan
            size={16}
            fontFamily={'PretendardRegular'}
            color={'#3e3737'}
            marginTop={18}
            marginLeft={6}
          >
            (1300g)
          </CSSpan>
        </CSText>
      </div>
    </div>
  )
}

const container = css`
  width: 100%;
`

export default MainSection
