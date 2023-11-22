import AutoSizeImage from '@components/cs/AutoSizeImage'
import CSText from '@components/cs/CSText'
import { css } from '@emotion/react'
import React from 'react'

const MethodSection = () => {
  const methodData = [
    { title: '따뜻하게 데워 먹기', imageUrl: '/images/way1.png' },
    { title: '온 가족 다 같이', imageUrl: '/images/way2.png' },
    { title: '김치와 함께', imageUrl: '/images/way3.png' },
    { title: '따뜻한 쌀밥과 함께', imageUrl: '/images/way4.png' },
  ]

  return (
    <div>
      <CSText
        size={2.4}
        fontFamily={'SeoulHangangEB'}
        color={'#3e3737'}
        marginTop={6}
        marginBottom={4}
        lineHeight={0.83}
        textAlignCenter
      >
        맛있게 먹는 법 및 보관 방법
      </CSText>
      <div
        css={{
          width: '100%',
          padding: '2rem',
          backgroundColor: '#c4edff',
        }}
      >
        <div
          css={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            paddingTop: '3.4rem',
            paddingBottom: `2.6rem`,
          }}
        >
          <CSText
            size={1.2}
            color={'#5d5d5d'}
            lineHeight={1.33}
            textAlignCenter
          >
            달인의 가마솥 한우곰탕, 설렁탕, 갈비탕
          </CSText>
          <CSText
            size={2}
            color="#3e3737"
            lineHeight={1}
            textAlignCenter
            fontFamily="SeoulHangangEB"
            marginTop={1}
            marginBottom={4}
          >
            맛있게 먹는 방법
          </CSText>
          <div css={methodWrapperWithBorder}>
            {methodData.map(({ title, imageUrl }, index) => (
              <div key={index} css={method}>
                <AutoSizeImage src={imageUrl} width={12} height={12} />

                <CSText
                  size={1.5}
                  fontFamily={'PretendardBold'}
                  color={'#15c9de'}
                  marginTop={1.8}
                  lineHeight={1.33}
                >
                  {title}
                </CSText>
              </div>
            ))}
          </div>
        </div>
        <div
          css={{
            padding: '2rem 1.6rem',
            height: '10rem',
            backgroundColor: '#77bfdf',
            marginTop: '1.8rem',
            borderRadius: '1.2rem',
            whiteSpace: 'pre-line',
          }}
        >
          <CSText
            size={1.4}
            fontFamily={'PretendardBold'}
            color="#fff"
            lineHeight={1.21}
          >
            유통기한 안내
          </CSText>
          <CSText size={1.2} color="#fff" lineHeight={1.42} marginTop={1.3}>
            {`냉동보관, 6개월\n해동 후 개봉된 제품은 다시 냉동하지 마시고 바로 드세요.`}
          </CSText>
        </div>
      </div>
    </div>
  )
}

const methodWrapper = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
`
const method = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const methodWrapperWithBorder = css`
  ${methodWrapper}
  & > :nth-of-type(1) {
    border-bottom: 1px dotted #94d5ff;
    border-right: 1px dotted #94d5ff;
    padding-bottom: 34px;
  }
  & > :nth-of-type(2) {
    border-bottom: 1px dotted #94d5ff;
    padding-bottom: 34px;
  }
  & > :nth-of-type(3) {
    border-right: 1px dotted #94d5ff;
    padding-top: 20.5px;
  }
  & > :nth-of-type(4) {
    padding-top: 20.5px;
  }
`
export default MethodSection
