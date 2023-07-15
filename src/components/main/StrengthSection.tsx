import AutoSizeImage from '@components/cs/AutoSizeImage'
import CSSpan from '@components/cs/CSSpan'
import CSText from '@components/cs/CSText'
import { css } from '@emotion/react'
import React from 'react'
import { RootState, useAppSelector } from 'src/store'
import { toSize } from 'styles/globalStyle'

const StrengthSection = () => {
  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )

  const getSize = (input: number) => {
    return toSize(width, height, input)
  }
  return (
    <div css={[container, { marginTop: `${getSize(30)}px` }]}>
      <div css={strength}>
        <AutoSizeImage
          src={'/images/ico_point@3x.png'}
          width={34}
          height={20}
        />
        <CSText
          size={13}
          fontFamily={'RIDIBatang'}
          color={'#3e3737'}
          marginTop={20}
          lineHeight={1.23}
        >
          {'신선한 재료로 최상의 맛을 구현한'}
        </CSText>
        <CSText
          size={24}
          fontFamily={'GodoB'}
          color={'#3e3737'}
          marginTop={11}
          lineHeight={1.13}
        >
          {'공릉동 한우 소고기 국밥'}
        </CSText>
        <CSText
          size={15}
          fontFamily={'PretendardBold'}
          color={'#3e3737'}
          marginTop={30}
          lineHeight={1.33}
        >
          {'공릉동 한우 소고기 국밥'}
          <CSSpan
            size={15}
            fontFamily={'PretendardRegular'}
            color={'#3e3737'}
            marginTop={11}
            lineHeight={1.33}
          >
            {'은 오랜시간을 투자하여'}
          </CSSpan>
        </CSText>
        <CSText
          size={15}
          fontFamily={'PretendardRegular'}
          color={'#3e3737'}
          lineHeight={1.33}
        >
          {'푹끓인 사골 베이스에 한우소고기와 우거지 등의'}
        </CSText>
        <CSText
          size={15}
          fontFamily={'PretendardBold'}
          color={'#3e3737'}
          lineHeight={1.33}
        >
          {'신선한 재료를 더해 '}
          <CSSpan
            size={15}
            fontFamily={'PretendardBold'}
            color={'#8d3036'}
            lineHeight={1.33}
          >
            {'최상의 맛을 '}
          </CSSpan>
          <CSSpan
            size={15}
            fontFamily={'PretendardRegular'}
            color={'#3e3737'}
            lineHeight={1.33}
          >
            {'구현했습니다.'}
          </CSSpan>
        </CSText>
      </div>

      <div
        css={[
          aging,
          {
            backgroundColor: '#c79c89',
            height: `${getSize(160)}px`,
            marginTop: `${getSize(50)}px`,
            display: 'flex',
            whiteSpace: 'pre-line',
          },
        ]}
      >
        <div css={[agingText, { padding: `${getSize(20)}px` }]}>
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
        <div css={[agingImage, { marginTop: `${getSize(20)}px` }]}>
          <AutoSizeImage
            src={'/images/img_01@3x.png'}
            width={toSize(width, height, 160)}
            height={toSize(width, height, 160)}
          />
        </div>
      </div>
      <div
        css={{
          marginTop: `${getSize(10)}px`,
          marginLeft: `${getSize(20)}px`,
        }}
      >
        <CSText
          size={15}
          fontFamily={'PretendardRegular'}
          color={'#3e3737'}
          lineHeight={1.33}
        >
          {'저희 가게는 고객님께'}
        </CSText>
        <CSText
          size={15}
          fontFamily={'PretendardBold'}
          color={'#3e3737'}
          lineHeight={1.33}
        >
          {'최상의 만족'}
          <CSSpan
            size={16}
            fontFamily={'PretendardRegular'}
            color={'#3e3737'}
            lineHeight={1.33}
          >
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
          <CSSpan
            size={16}
            fontFamily={'PretendardRegular'}
            color={'#3e3737'}
            lineHeight={1.33}
          >
            {'을 약속드립니다.'}
          </CSSpan>
        </CSText>
      </div>
    </div>
  )
}

const container = css`
  width: 100%;
`
const strength = css`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`
const aging = css`
  width: 100%;
`
const agingText = css`
  width: 50%;
`
const agingImage = css`
  width: 50%;
`

export default StrengthSection
