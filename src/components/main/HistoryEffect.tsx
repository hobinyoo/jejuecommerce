import AutoSizeImage from '@components/cs/AutoSizeImage'
import CSText from '@components/cs/CSText'
import { css } from '@emotion/react'
import React from 'react'

const HistoryEffect = () => {
  const Feature = [
    { title: `물 맛 좋은\n 청정 제주`, src: '/images/history3.png' },
    { title: `신선하고\n 건강한 재료`, src: '/images/history2.png' },
    { title: `hand made\n 제품`, src: '/images/history1.png' },
  ]

  return (
    <div css={container}>
      <div css={containerInner}>
        <CSText
          size={2.4}
          fontFamily={'SeoulHangangEB'}
          color={'#3e3737'}
          marginTop={3.5}
          lineHeight={0.83}
          textAlignCenter
        >
          달인의 가마솥은?
        </CSText>
        <div>
          <CSText size={1.3} color={'#818181'} marginTop={3} lineHeight={1.62}>
            1. 달인의 가마솥은 "물 맛 좋은 제주"에서 만듭니다.
          </CSText>
          <CSText size={1.3} color={'#818181'} lineHeight={1.62}>
            2. "100% 한우"와 신선하고 좋은 재료를 사용한 안심 먹거리 입니다.
          </CSText>
          <CSText size={1.3} color={'#818181'} lineHeight={1.62}>
            3. 밀키트 제품이 아닌 달인이 만드는 "hand made 제품"으로 맛을
            보장합니다.
          </CSText>
        </div>
        <CSText
          size={1.3}
          color={'#818181'}
          marginTop={3}
          lineHeight={1.62}
          textAlignCenter
        >
          {`요리에 진심인 쉐프가 전통 가마솥 방식으로\n맛 좋은 먹거리를 만든다'는 의미로 \n공장에서 대량으로 만드는 밀키트가 아닙니다.`}
        </CSText>
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            marginTop: '3rem',
          }}
        >
          <div>
            <div
              css={{
                border: '1px solid #000',
                width: '6rem',
              }}
            />
          </div>
          <div
            css={{
              width: '0.3rem',
              height: '0.3rem',
              backgroundColor: '#000',
            }}
          />
          <CSText size={1.3} color="#000" lineHeight={1.62}>
            달인의 가마솥 특징
          </CSText>
          <div
            css={{
              width: '0.3rem',
              height: '0.3rem',
              backgroundColor: '#000',
              marginLeft: '0.75rem',
            }}
          />
          <div>
            <div
              css={{
                border: '1px solid #000',
                width: '6rem',
              }}
            />
          </div>
        </div>
        <div
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '3rem',
          }}
        >
          {Feature.map(({ title, src }, index) => (
            <div
              key={index}
              css={{
                display: 'flex',
                flexDirection: 'column',
                width: '6rem',
              }}
            >
              <AutoSizeImage src={src} width={6} height={6} />
              <CSText
                size={1.1}
                lineHeight={1.3}
                marginTop={1.8}
                fontFamily="PretendardBold"
                textAlignCenter
              >
                {title}
              </CSText>
            </div>
          ))}
        </div>
      </div>

      <AutoSizeImage src={'/images/menubg.png'} full />
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
  width: calc(100% - 4rem);
  height: calc(100% - 6rem);
  white-space: pre-line;
  padding-left: 3.5rem;
  padding-right: 3.5rem;
`

export default HistoryEffect
