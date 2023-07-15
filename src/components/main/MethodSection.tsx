import AutoSizeImage from '@components/cs/AutoSizeImage'
import CSSpan from '@components/cs/CSSpan'

import CSText from '@components/cs/CSText'
import { css } from '@emotion/react'
import React from 'react'
import { RootState, useAppSelector } from 'src/store'
import { toSize } from 'styles/globalStyle'

const MethodSection = () => {
  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )

  const getSize = (input: number) => {
    return toSize(width, height, input)
  }

  return (
    <div css={[container, { marginBottom: toSize(width, height, 60) }]}>
      <AutoSizeImage src={'/images/ico_point@3x.png'} width={34} height={20} />
      <CSText
        size={24}
        fontFamily={'GodoB'}
        color={'#3e3737'}
        marginTop={20}
        marginBottom={30}
        lineHeight={1.13}
      >
        {'맛있게 먹는 법 및 보관 방법'}
      </CSText>

      {['STEP 01', 'STEP 02', 'STEP 03'].map((value, key) => {
        return (
          <div
            key={key}
            css={{
              width: `${getSize(320)}px`,
              height: `${getSize(105)}px`,
              borderRadius: `${getSize(12)}px`,
              backgroundColor: '#f3e3dc',
              marginBottom: `${getSize(15)}px`,
              display: 'flex',
              alignItems: 'center',
              padding: `0 ${getSize(20)}px`,
            }}
          >
            <div css={{ width: `${getSize(93)}px` }}>
              <AutoSizeImage
                src={`/images/step_0${key + 1}@3x.png`}
                width={
                  key === 0
                    ? getSize(93)
                    : key === 1
                    ? getSize(88)
                    : getSize(83)
                }
                height={
                  key === 0
                    ? getSize(64)
                    : key === 1
                    ? getSize(76)
                    : getSize(68)
                }
              />
            </div>

            {key === 0 ? (
              <div css={{ marginLeft: `${getSize(20)}px` }}>
                <div
                  css={[
                    step,
                    {
                      width: `${getSize(62)}px`,
                      height: `${getSize(20)}px`,
                      borderRadius: `${getSize(11)}px`,
                    },
                  ]}
                >
                  <CSText
                    size={10}
                    fontFamily={'PretendardRegular'}
                    color={'#fff'}
                    lineHeight={1.8}
                  >
                    {value}
                  </CSText>
                </div>
                <CSText
                  size={13}
                  fontFamily={'PretendardRegular'}
                  color={'#000'}
                  lineHeight={1.38}
                  marginTop={6}
                >
                  {'냉동 보관한 국밥을 '}
                  <CSSpan
                    size={13}
                    fontFamily={'PretendardBold'}
                    color={'#000'}
                    lineHeight={1.38}
                  >
                    {'냄비나'}
                  </CSSpan>
                </CSText>
                <CSText
                  size={13}
                  fontFamily={'PretendardBold'}
                  color={'#000'}
                  lineHeight={1.38}
                >
                  {'뚝빼기에 담아 중불'}
                  <CSSpan
                    size={13}
                    fontFamily={'PretendardRegular'}
                    color={'#000'}
                    lineHeight={1.38}
                  >
                    {'로 끓여줍니다.'}
                  </CSSpan>
                </CSText>
              </div>
            ) : key === 1 ? (
              <div css={{ marginLeft: `${getSize(20)}px` }}>
                <div
                  css={[
                    step,
                    {
                      width: `${getSize(62)}px`,
                      height: `${getSize(20)}px`,
                      borderRadius: `${getSize(11)}px`,
                    },
                  ]}
                >
                  <CSText
                    size={10}
                    fontFamily={'PretendardRegular'}
                    color={'#fff'}
                    lineHeight={1.8}
                  >
                    {value}
                  </CSText>
                </div>
                <CSText
                  size={13}
                  fontFamily={'PretendardRegular'}
                  color={'#000'}
                  lineHeight={1.38}
                  marginTop={6}
                >
                  {'취향에 따라 '}
                  <CSSpan
                    size={13}
                    fontFamily={'PretendardBold'}
                    color={'#000'}
                    lineHeight={1.38}
                  >
                    {'청양고추 및 대파를'}
                  </CSSpan>
                </CSText>
                <CSText
                  size={13}
                  fontFamily={'PretendardRegular'}
                  color={'#000'}
                  lineHeight={1.38}
                >
                  {'넣어주세요.'}
                </CSText>
              </div>
            ) : (
              <div css={{ marginLeft: `${getSize(20)}px` }}>
                <div
                  css={[
                    step,
                    {
                      width: `${getSize(62)}px`,
                      height: `${getSize(20)}px`,
                      borderRadius: `${getSize(11)}px`,
                    },
                  ]}
                >
                  <CSText
                    size={10}
                    fontFamily={'PretendardRegular'}
                    color={'#fff'}
                    lineHeight={1.8}
                  >
                    {value}
                  </CSText>
                </div>
                <CSText
                  size={13}
                  fontFamily={'PretendardRegular'}
                  color={'#000'}
                  lineHeight={1.38}
                  marginTop={6}
                >
                  {'냉장고 3~4일 냉동실에는'}
                </CSText>
                <CSText
                  size={13}
                  fontFamily={'PretendardRegular'}
                  color={'#000'}
                  lineHeight={1.38}
                >
                  {'3개월 보관해주세요.'}
                </CSText>
              </div>
            )}
          </div>
        )
      })}
      <div css={{ marginTop: `${getSize(35)}px` }}>
        <AutoSizeImage
          src={'/images/img_07@3x.png'}
          width={getSize(360)}
          height={getSize(240)}
        />
      </div>
      <CSText
        size={16}
        fontFamily={'RIDIBatang'}
        color={'#3e3737'}
        lineHeight={1.38}
        marginTop={30}
      >
        {'좋은 재료를 아낌없이 담았습니다.'}
      </CSText>
      <CSText
        size={16}
        fontFamily={'RIDIBatang'}
        color={'#3e3737'}
        lineHeight={1.38}
      >
        {'특별한 반찬 없이 집에서 간편하게 즐기세요!'}
      </CSText>
      {/* TODO:포장 사진 */}
      <CSText
        size={15}
        fontFamily={'PretendardRegular'}
        color={'#3e3737'}
        lineHeight={1.33}
        marginTop={31}
      >
        {'포장 판매는 정량의'}
        <CSSpan
          size={15}
          fontFamily={'PretendardBold'}
          color={'#8d3036'}
          lineHeight={1.33}
        >
          {'1.5배의 양이 제공'}
        </CSSpan>
        <CSSpan
          size={15}
          fontFamily={'PretendardRegular'}
          color={'#3e3737'}
          lineHeight={1.33}
        >
          {'됩니다.'}
        </CSSpan>
      </CSText>
      <CSText
        size={15}
        fontFamily={'PretendardRegular'}
        color={'#3e3737'}
        lineHeight={1.33}
      >
        {'1~2인분의 양이 제공됨으로'}
      </CSText>
      <CSText
        size={15}
        fontFamily={'PretendardRegular'}
        color={'#3e3737'}
        lineHeight={1.33}
      >
        {'나눠서 드시고 싶으신 고객분들을 고려하여'}
      </CSText>
      <CSText
        size={15}
        fontFamily={'PretendardBold'}
        color={'#3e3737'}
        lineHeight={1.33}
      >
        {'소분된 포장 방법  제공해 드리고 있습니다.'}
      </CSText>
      <CSText
        size={13}
        fontFamily={'PretendardRegular'}
        color={'#9e9795'}
        lineHeight={1.54}
        marginTop={20}
      >
        {'*주문시 선택 가능합니다.'}
      </CSText>
    </div>
  )
}

const container = css`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const step = css`
  background-color: #64574f;
  display: flex;
  justify-content: center;
  align-items: center;
`
export default MethodSection
