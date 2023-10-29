import AutoSizeImage from '@components/cs/AutoSizeImage'

import CSText from '@components/cs/CSText'
import { css } from '@emotion/react'
import React from 'react'
import { RootState, useAppSelector } from 'src/store'
import { toSize } from 'styles/globalStyle'

const MenuPointSection = () => {
  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )
  const getSize = (input: number) => {
    return toSize(width, height, input)
  }

  const menuPointData = [
    '물 맛 좋은 제주에서 만듭니다.',
    '100% 한우 또는 국내산 육우를 사용합니다.',
    '신선하고 좋은 재료로 만든 안심 먹거리 입니다.',
    `단순 밀키트가 아닌 달인이 만든 "Hand M\n ade" 제품으로 맛을 보장합니다.`,
  ]
  return (
    <div css={[container, { marginTop: `${getSize(60)}px` }]}>
      <CSText
        size={24}
        fontFamily={'SeoulHangangEB'}
        color={'#3e3737'}
        marginBottom={30}
        lineHeight={0.83}
        textAlignCenter
      >
        {'메뉴만의 포인트 및 장점'}
      </CSText>

      <div
        css={[
          pointListWrapper,
          { gap: `${getSize(16)}px`, padding: `0 ${getSize(20)}px` },
        ]}
      >
        {menuPointData.map((data, index) => (
          <div
            css={[
              pointList,
              {
                paddingTop: `${getSize(10)}px`,
                paddingBottom: `${getSize(12)}px`,
                borderRadius: `${getSize(30)}px`,
                paddingLeft: `${getSize(12)}px`,
                gap: `${getSize(10)}px`,
              },
            ]}
            key={index}
          >
            <div
              css={[
                circle,
                {
                  height: `${getSize(30)}px`,
                  width: `${getSize(30)}px`,
                },
              ]}
            >
              <CSText
                size={16}
                color={'#6dbc59'}
                lineHeight={1.38}
                fontFamily="PretendardBold"
              >
                {`0${index + 1}`}
              </CSText>
            </div>
            <CSText size={14} color={'#fff'} lineHeight={1.57}>
              {data}
            </CSText>
          </div>
        ))}
      </div>
      <AutoSizeImage
        src={'/images/swimming.png'}
        width={getSize(360)}
        height={getSize(233)}
      />
    </div>
  )
}

const container = css`
  width: 100%;
`

const pointListWrapper = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const pointList = css`
  width: 100%;
  background-color: #6dbc59;
  display: flex;
  white-space: pre-line;
  align-items: center;
`
const circle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #fff;
`
export default MenuPointSection
