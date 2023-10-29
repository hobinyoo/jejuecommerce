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

  const methodData = [
    { title: '따뜻하게 데워 먹기', imageUrl: '/images/way1.png' },
    { title: '온 가족 다 같이', imageUrl: '/images/way2.png' },
    { title: '김치와 함께', imageUrl: '/images/way3.png' },
    { title: '따뜻한 쌀밥과 함께', imageUrl: '/images/way4.png' },
  ]

  return (
    <div>
      <CSText
        size={24}
        fontFamily={'SeoulHangangEB'}
        color={'#3e3737'}
        marginTop={60}
        marginBottom={40}
        lineHeight={0.83}
        textAlignCenter
      >
        {'맛있게 먹는 법 및 보관 방법'}
      </CSText>
      <div
        css={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: `${getSize(20)}px`,
        }}
      >
        <AutoSizeImage
          src={'/images/methodMenu.png'}
          width={getSize(332)}
          height={getSize(314)}
        />
      </div>
      <div
        css={{
          width: '100%',
          padding: `${getSize(20)}px`,
          backgroundColor: '#c4edff',
        }}
      >
        <div
          css={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            paddingTop: `${getSize(34)}px`,
            paddingBottom: `${getSize(26)}px `,
          }}
        >
          <CSText size={12} color={'#5d5d5d'} lineHeight={1.33} textAlignCenter>
            달인의 가마솥 한우곰탕, 설렁탕, 갈비탕
          </CSText>
          <CSText
            size={20}
            color="#3e3737"
            lineHeight={1}
            textAlignCenter
            fontFamily="SeoulHangangEB"
            marginTop={10}
            marginBottom={40}
          >
            맛있게 먹는 방법
          </CSText>
          <div css={methodWrapperWithBorder}>
            {methodData.map(({ title, imageUrl }, index) => (
              <div key={index} css={method}>
                <AutoSizeImage
                  src={imageUrl}
                  width={getSize(120)}
                  height={getSize(120)}
                  borderRadius="50%"
                />

                <CSText
                  size={15}
                  fontFamily={'PretendardBold'}
                  color={'#15c9de'}
                  marginTop={18}
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
            padding: `${getSize(20)}px ${getSize(16)}px`,
            height: `${getSize(100)}px`,
            backgroundColor: '#77bfdf',
            marginTop: `${getSize(18)}px`,
            borderRadius: `${getSize(12)}px`,
          }}
        >
          <CSText
            size={14}
            fontFamily={'PretendardBold'}
            color={'#fff'}
            lineHeight={1.21}
          >
            유통기한 안내
          </CSText>
          <CSText size={12} color={'#fff'} lineHeight={1.42} marginTop={13}>
            유통기한에 관한 내용이 나옵니다.
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
  & > :nth-child(1) {
    border-bottom: 1px dotted #94d5ff;
    border-right: 1px dotted #94d5ff;
    padding-bottom: 34px;
  }
  & > :nth-child(2) {
    border-bottom: 1px dotted #94d5ff;
    padding-bottom: 34px;
  }
  & > :nth-child(3) {
    border-right: 1px dotted #94d5ff;
    padding-top: 20.5px;
  }
  & > :nth-child(4) {
    padding-top: 20.5px;
  }
`
export default MethodSection
