import AutoSizeImage from '@components/cs/AutoSizeImage'
import CSText from '@components/cs/CSText'
import { css } from '@emotion/react'
import React from 'react'

const MenuPointSection = () => {
  const menuPointData = [
    '물 맛 좋은 제주에서 만듭니다.',
    '100% 한우한 신선하고 좋은 재료로 만든\n 안심 먹거리 입니다.',
    '밀키트와 전혀 다른 달인이 만든 "hand made\n 제품"으로 맛을 보장합니다.',
  ]

  return (
    <div css={[container, { marginTop: '6rem' }]}>
      <CSText
        size={2.4}
        fontFamily={'SeoulHangangEB'}
        color={'#3e3737'}
        marginBottom={3}
        lineHeight={0.83}
        textAlignCenter
      >
        {'메뉴만의 포인트 및 장점'}
      </CSText>

      <div css={[pointListWrapper, { gap: '1.6rem', padding: '0 2rem' }]}>
        {menuPointData.map((data, index) => (
          <div
            css={[
              pointList,
              {
                paddingTop: '1rem',
                paddingBottom: '1.2rem',
                borderRadius: '3rem',
                paddingLeft: '1.2em',
                gap: '1rem',
              },
            ]}
            key={index}
          >
            <div
              css={[
                circle,
                {
                  height: '3rem',
                  width: '3rem',
                },
              ]}
            >
              <CSText
                size={1.6}
                color={'#6dbc59'}
                lineHeight={1.38}
                fontFamily="PretendardBold"
              >
                {`0${index + 1}`}
              </CSText>
            </div>
            <CSText size={1.4} color="#fff" lineHeight={1.57}>
              {data}
            </CSText>
          </div>
        ))}
      </div>
      <AutoSizeImage src={'/images/swimming.png'} full />
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
