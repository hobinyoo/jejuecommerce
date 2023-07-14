import AutoSizeImage from '@components/cs/AutoSizeImage'
import CSSpan from '@components/cs/CSSpan'
import CSText from '@components/cs/CSText'
import { css } from '@emotion/react'
import React from 'react'
import { RootState, useAppSelector } from 'src/store'
import { toSize } from 'styles/globalStyle'

const StrengthSectionTwo = () => {
  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )
  const getSize = (input: number) => {
    return toSize(width, height, input)
  }

  return (
    <div css={container}>
      <div
        css={[
          beefStrength,
          { marginTop: `${getSize(80)}px`, whiteSpace: 'pre-line' },
        ]}
      >
        <AutoSizeImage
          src={'/images/ico_point@3x.png'}
          width={34}
          height={20}
        />
        <CSText
          size={24}
          fontFamily={'GodoB'}
          color={'#3e3737'}
          marginTop={20}
          lineHeight={1.13}
        >
          {'한우소고기 국밥'}
        </CSText>
        <CSText
          size={24}
          fontFamily={'GodoB'}
          color={'#3e3737'}
          lineHeight={1.13}
        >
          {'역사 및 효능'}
        </CSText>
        <CSText
          size={15}
          fontFamily={'PretendardRegular'}
          color={'#3e3737'}
          marginTop={30}
          lineHeight={1.33}
        >
          {'소고기 국밥은 한국의 전통 음식 중 하나로,'}
        </CSText>
        <CSText
          size={15}
          fontFamily={'PretendardRegular'}
          color={'#3e3737'}
          lineHeight={1.33}
        >
          {'오랜 역사와 유래를 갖고 있습니다.'}
        </CSText>
        <CSText
          size={15}
          fontFamily={'PretendardRegular'}
          color={'#3e3737'}
          marginTop={20}
          lineHeight={1.33}
        >
          {'다양한 지역에서 소고기 국밥이 있지만,'}
        </CSText>
        <CSText
          size={15}
          fontFamily={'PretendardRegular'}
          color={'#3e3737'}
          lineHeight={1.33}
        >
          {'일반적으로 '}
          <CSSpan
            size={15}
            fontFamily={'PretendardBold'}
            color={'#3e3737'}
            lineHeight={1.33}
          >
            {'한우나 우거지 등의 신선한 재료로'}
          </CSSpan>
        </CSText>
        <CSText
          size={15}
          fontFamily={'PretendardBold'}
          color={'#3e3737'}
          lineHeight={1.33}
        >
          {'만들어진 고기 국밥이 가장 유명'}
          <CSSpan
            size={15}
            fontFamily={'PretendardRegular'}
            color={'#3e3737'}
            lineHeight={1.33}
          >
            {'합니다.'}
          </CSSpan>
        </CSText>
        <div css={{ margin: toSize(width, height, 30) }}>
          <AutoSizeImage
            src={'/images/img_02@3x.png'}
            width={toSize(width, height, 360)}
            height={toSize(width, height, 212)}
          />
        </div>
        <CSText
          size={15}
          fontFamily={'PretendardRegular'}
          color={'#3e3737'}
          lineHeight={1.33}
        >
          {'소고기 국밥은 기름진 사골이나 고기를'}
        </CSText>
        <CSText
          size={15}
          fontFamily={'PretendardRegular'}
          color={'#3e3737'}
          lineHeight={1.33}
        >
          {'오랫동안 끓여 깊고 풍부한 육수를 만들어내며,'}
        </CSText>
        <CSText
          size={15}
          fontFamily={'PretendardBold'}
          color={'#3e3737'}
          lineHeight={1.33}
        >
          {'고기는 부드럽고 풍성한 맛'}
          <CSSpan
            size={15}
            fontFamily={'PretendardRegular'}
            color={'#3e3737'}
            lineHeight={1.33}
          >
            {'을 냅니다.'}
          </CSSpan>
        </CSText>

        <CSText
          size={15}
          fontFamily={'PretendardRegular'}
          color={'#3e3737'}
          lineHeight={1.33}
          marginTop={30}
        >
          {'이 국밥은 '}
          <CSSpan
            size={15}
            fontFamily={'PretendardBold'}
            color={'#3e3737'}
            lineHeight={1.33}
          >
            {'영양가가 높고, 특히 단백질, 철분,'}
          </CSSpan>
        </CSText>
        <CSText
          size={15}
          fontFamily={'PretendardBold'}
          color={'#3e3737'}
          lineHeight={1.33}
        >
          {'아미노산 등을 풍부하게 함유'}
          <CSSpan
            size={15}
            fontFamily={'PretendardRegular'}
            color={'#3e3737'}
            lineHeight={1.33}
          >
            {'하고 있어'}
          </CSSpan>
        </CSText>
        <CSText
          size={15}
          fontFamily={'PretendardBold'}
          color={'#8d3036'}
          lineHeight={1.33}
          marginBottom={46}
        >
          {'건강에 도움'}
          <CSSpan
            size={15}
            fontFamily={'PretendardRegular'}
            color={'#3e3737'}
            lineHeight={1.33}
          >
            {'을 줄 수 있습니다.'}
          </CSSpan>
        </CSText>
        <div css={[beefContainer, { marginBottom: `${getSize(50)}px` }]}>
          <div css={beefInner}>
            <div
              css={[
                beefLogo,
                {
                  marginTop: `${getSize(30)}px`,
                  marginRight: `${getSize(20)}px`,
                },
              ]}
            >
              <AutoSizeImage
                src={'/images/img_03_logo@2x.png'}
                width={toSize(width, height, 154)}
                height={toSize(width, height, 32)}
              />
            </div>
            <div
              css={{
                marginTop: toSize(width, height, 38),
                marginLeft: toSize(width, height, 20),
                whiteSpace: 'pre-line',
              }}
            >
              <CSText
                size={18}
                fontFamily={'PretendardBold'}
                color={'#fff'}
                lineHeight={1.47}
              >
                {'소고기 자체는'}
              </CSText>
              <CSText
                size={15}
                fontFamily={'PretendardRegular'}
                color={'#fff'}
                lineHeight={1.47}
              >
                {
                  '고단백, 저지방 식품으로 알려져 있으며 \n 국밥으로 먹을 경우에도 고기의 영양소를 \n 쉽게 섭취할 수 있습니다.'
                }
              </CSText>
              <CSText
                size={15}
                fontFamily={'PretendardRegular'}
                color={'#fff'}
                lineHeight={1.47}
                marginTop={toSize(width, height, 30)}
              >
                {
                  '특히 철분은 혈액의 산소 운반에 \n 필요한 중요한 영양소로 알려져 있어 \n 빈혈 예방과 에너지 공급에 도움을 줍니다.'
                }
              </CSText>
              <CSText
                size={15}
                fontFamily={'PretendardRegular'}
                color={'#fff'}
                lineHeight={1.47}
                marginTop={toSize(width, height, 30)}
              >
                {
                  '또한 아미노산은 신체의 조직 구조와 기능에 \n 관여하여 성장과 회복력에 \n 도움을 주는 역할을 합니다.'
                }
              </CSText>
            </div>
          </div>

          <AutoSizeImage
            src={'/images/img_03@3x.png'}
            width={toSize(width, height, 360)}
            height={toSize(width, height, 575)}
          />
        </div>
      </div>
      <div
        css={[
          beefStrengthTwo,
          {
            height: `${getSize(204)}px`,
            marginBottom: `${getSize(50)}px`,
            display: 'flex',
            whiteSpace: 'pre-line',
          },
        ]}
      >
        <div css={[beefStrengthTwoImageContainer]}>
          <div css={beefStrengthTwoImageBackground}>
            <div
              css={[
                beefStrengthTwoImage,
                {
                  marginLeft: `${getSize(20)}px`,
                },
              ]}
            >
              <AutoSizeImage
                src={'/images/main_img@3x.png'}
                width={toSize(width, height, 160)}
                height={toSize(width, height, 160)}
              />
            </div>
          </div>
        </div>
        <div
          css={[
            beefStrengthTwoTextContainer,
            {
              padding: `${getSize(20)}px`,
            },
          ]}
        >
          <CSText
            size={14}
            fontFamily={'PretendardRegular'}
            color={'#3e3737'}
            lineHeight={1.43}
          >
            {'때문에 소고기 국밥은'}
          </CSText>
          <CSText
            size={14}
            fontFamily={'PretendardBold'}
            color={'#3e3737'}
            lineHeight={1.43}
          >
            {'영양 가득한 한 끼 식사'}
            <CSSpan
              size={14}
              fontFamily={'PretendardRegular'}
              color={'#3e3737'}
              lineHeight={1.43}
            >
              {'로'}
            </CSSpan>
          </CSText>
          <CSText
            size={14}
            fontFamily={'PretendardRegular'}
            color={'#3e3737'}
            lineHeight={1.43}
          >
            {
              '많은 사람들에게 \n 사랑을 받고 있으며, \n 계절 내내 몸을 \n 따뜻하게 해주는'
            }
          </CSText>
          <CSText
            size={14}
            fontFamily={'PretendardBold'}
            color={'#8d3036'}
            lineHeight={1.43}
          >
            {'포만감과 영양을 \n 제공해준다는 이유로 \n 더욱 '}
            <CSSpan
              size={14}
              fontFamily={'PretendardRegular'}
              color={'#3e3737'}
              lineHeight={1.43}
            >
              {'인기를 끌고 있습니다.'}
            </CSSpan>
          </CSText>
        </div>
      </div>
      <div
        css={[
          beefStrengthTwoImageSecond,
          { marginBottom: toSize(width, height, 60) },
        ]}
      >
        <AutoSizeImage
          src={'/images/img_05@3x.png'}
          width={toSize(width, height, 320)}
          height={toSize(width, height, 213)}
        />
      </div>
    </div>
  )
}

const container = css`
  width: 100%;
`
const beefStrength = css`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`
const beefContainer = css`
  width: 100%;
  position: relative;
`
const beefInner = css`
  width: 100%;
  position: absolute;
  z-index: 1;
  color: white;
`
const beefLogo = css`
  display: flex;
  justify-content: flex-end;
`
const beefStrengthTwo = css`
  width: 100%;
`
const beefStrengthTwoImageContainer = css`
  width: 50%;
`
const beefStrengthTwoImageBackground = css`
  width: calc(100% * 5 / 6);
  height: 100%;
  background-color: #c79c89;
  z-index: 1;
  position: relative;
`
const beefStrengthTwoImage = css`
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
`
const beefStrengthTwoTextContainer = css`
  width: 50%;
`
const beefStrengthTwoImageSecond = css`
  width: 100%;
  display: flex;
  justify-content: center;
`
export default StrengthSectionTwo
