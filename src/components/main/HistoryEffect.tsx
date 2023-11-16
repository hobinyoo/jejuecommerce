import AutoSizeImage from '@components/cs/AutoSizeImage'
import CSText from '@components/cs/CSText'
import { css } from '@emotion/react'
import React from 'react'
import { RootState, useAppSelector } from 'src/store'
import { toSize } from 'styles/globalStyle'

const HistoryEffect = () => {
  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )

  const getSize = (input: number) => {
    return toSize(width, height, input)
  }

  const Feature = [
    { title: `온 가족이\n 함께즐겨요`, src: '/images/history1.png' },
    { title: `건강한 맛\n 건강한 재료`, src: '/images/history1.png' },
    { title: `물 맛 좋은\n 청정 제주`, src: '/images/history1.png' },
  ]
  return (
    <div css={container}>
      <div
        css={[
          containerInner,
          {
            width: `${getSize(320)}px`,
            height: `${getSize(480)}px`,
            whiteSpace: 'pre-line',
          },
        ]}
      >
        <CSText
          size={24}
          fontFamily={'SeoulHangangEB'}
          color={'#3e3737'}
          marginTop={35}
          lineHeight={0.83}
          textAlignCenter
        >
          달인의 가마솥 목표
        </CSText>
        <CSText
          size={13}
          color={'#818181'}
          marginTop={30}
          lineHeight={1.62}
          textAlignCenter
        >
          {`달인의 가마솥은 "물 맛 좋은 제주"에서 만듭니다. 또\n 한 "100% 한우 또는 국내산 육우"와 "신선하고 좋\n 은 재료"를 사용한 안심 먹거리 입니다
            밀키트 제품이 아닌 달인이 만드는 "hand made\n  제품"으로 맛을 보장합니다
            `}
        </CSText>

        <CSText
          size={13}
          color={'#818181'}
          marginTop={30}
          lineHeight={1.62}
          textAlignCenter
        >
          {`'요리에 진심인 쉐프가 전통 가마솥 방식으로\n맛 좋은 먹거리를 만든다'는 의미로 \n공장에서 대량으로 만드는 밀키트가 아닙니다.`}
        </CSText>
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: `${getSize(7.5)}px`,
            marginTop: `${getSize(30)}px`,
          }}
        >
          <div>
            <div
              css={{
                border: '1px solid #000',
                width: `${getSize(60)}px`,
              }}
            />
          </div>
          <div
            css={{
              width: `${getSize(3)}px`,
              height: `${getSize(3)}px`,
              backgroundColor: '#000',
            }}
          />
          <CSText size={13} color="#000" lineHeight={1.62}>
            {'달인의 가마솥 특징'}
          </CSText>
          <div
            css={{
              width: `${getSize(3)}px`,
              height: `${getSize(3)}px`,
              backgroundColor: '#000',
              marginLeft: `${getSize(7.5)}px`,
            }}
          />
          <div>
            <div
              css={{
                border: '1px solid #000',
                width: `${getSize(60)}px`,
              }}
            />
          </div>
        </div>
        <div
          css={{
            display: 'flex',
            paddingRight: `${getSize(35)}px`,
            paddingLeft: `${getSize(35)}px`,
            justifyContent: 'space-between',
            marginTop: `${getSize(30.5)}px`,
          }}
        >
          {Feature.map(({ title, src }, index) => (
            <div
              key={index}
              css={{
                display: 'flex',
                flexDirection: 'column',
                width: `${getSize(60)}px`,
              }}
            >
              <AutoSizeImage
                src={src}
                width={getSize(60)}
                height={getSize(60)}
              />
              <CSText
                size={10}
                lineHeight={1.3}
                marginTop={18}
                fontFamily="PretendardBold"
                textAlignCenter
              >
                {title}
              </CSText>
            </div>
          ))}
        </div>
      </div>

      <AutoSizeImage
        src={'/images/menubg.png'}
        width={getSize(360)}
        height={getSize(540)}
      />
    </div>
  )
}

const container = css`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const containerInner = css`
  position: absolute;
  z-index: 1;
  color: white;
  background-color: white;
`

export default HistoryEffect
