import AutoSizeImage from '@components/cs/AutoSizeImage'
import CSSpan from '@components/cs/CSSpan'
import CSText from '@components/cs/CSText'
import { css } from '@emotion/react'
import React from 'react'
import { RootState, useAppSelector } from 'src/store'
import { toSize } from 'styles/globalStyle'

const IntroMenuSection = () => {
  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )

  const getSize = (input: number) => {
    return toSize(width, height, input)
  }
  return (
    <div css={{ marginTop: `${getSize(60)}px` }}>
      <div css={{ textAlign: 'center' }}>
        <CSText
          size={24}
          fontFamily={'SeoulHangangEB'}
          color={'#3e3737'}
          lineHeight={0.83}
        >
          메뉴 소개
        </CSText>
      </div>
      <div
        css={[
          aging,
          {
            marginTop: `${getSize(40)}px`,
            display: 'flex',
            whiteSpace: 'pre-line',
          },
        ]}
      >
        <div css={[agingText, { paddingLe: `${getSize(20)}px` }]}>
          <CSText
            size={16}
            fontFamily={'RIDIBatang'}
            color={'#fff'}
            lineHeight={1.38}
          >
            {'냉장고에서 \n12시간 이상 \n숙성시킨 국밥은'}
          </CSText>
          <CSText
            size={16}
            fontFamily={'RIDIBatang'}
            color={'#8d3036'}
            lineHeight={1.38}
          >
            {'깊은 풍미와 \n 풍성한 맛'}
            <CSSpan
              size={16}
              fontFamily={'RIDIBatang'}
              color={'#fff'}
              lineHeight={1.33}
            >
              {'을'}
            </CSSpan>
          </CSText>

          <CSText
            size={16}
            fontFamily={'RIDIBatang'}
            color={'#fff'}
            lineHeight={1.38}
          >
            {'자랑합니다.'}
          </CSText>
        </div>
        <div css={[agingImage]}>
          <AutoSizeImage
            src={'/images/img_01@3x.png'}
            width={toSize(width, height, 180)}
            height={toSize(width, height, 162)}
          />
        </div>
      </div>
      <div
        css={{
          marginTop: `${getSize(10)}px`,
          marginLeft: `${getSize(20)}px`,
        }}
      >
        <CSText size={15} color={'#3e3737'} lineHeight={1.33}>
          {'저희 국밥은 고객님께'}
        </CSText>
        <CSText
          size={15}
          fontFamily={'PretendardBold'}
          color={'#3e3737'}
          lineHeight={1.33}
        >
          {'최상의 만족'}
          <CSSpan size={16} color={'#3e3737'} lineHeight={1.33}>
            {'을 선사하고자'}
          </CSSpan>
        </CSText>
        <CSText
          size={15}
          fontFamily={'PretendardBold'}
          color={'#3e3737'}
          lineHeight={1.33}
        >
          {'최선을 다할 것'}
          <CSSpan size={16} color={'#3e3737'} lineHeight={1.33}>
            {'을 약속드립니다.'}
          </CSSpan>
        </CSText>
      </div>
    </div>
  )
}

const aging = css`
  width: 100%;
`
const agingText = css`
  width: 50%;
`
const agingImage = css`
  width: 50%;
`

export default IntroMenuSection
