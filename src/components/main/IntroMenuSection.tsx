import AutoSizeImage from '@components/cs/AutoSizeImage'
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

  const menuData = [
    {
      title: '한우곰탕',
      soup: '600g 2포',
      meat: '한우사태 80g',
      description:
        '본 메뉴는 한우사태를 2시간 이상 삶으면서 무, 양파, 대파, 생강, 마\n늘, 건표고버섯, 천일염 등 신선한 재료를 엄선하여 물 맛 좋은 제주에\n서 가마솥 전통방식으로 정성껏 끓여 만든 달인의 대표 메뉴입니다',
      imageUrl: '/images/menu1.png',
      price: '12,000원',
    },
    {
      title: '한우 설렁탕',
      soup: '600g 2포',
      meat: '한우사태 80g',
      description:
        '본 메뉴는 한우사골, 꼬리반골, 우족, 잡뼈와 값비싼 한우도가니까지\n 넣어 물 맛 좋은 제주에서 가마솥 전통방식으로 12시간 이상 고아 만\n든 달인의 대표 메뉴입니다',

      imageUrl: '/images/menu2.png',
      price: '13,000원',
    },
    {
      title: '육우 갈비탕',
      soup: '600g 2포',
      meat: '국내산 육우갈비 220g',
      description:
        '본 메뉴의 육수는 한우곰탕 육수와 같은 방법으로 만들었고 고기는 국\n내산 육우(육우란 "한우, 젖소외에 식용을 목적으로 비육한 국내산\n 소"를 의미합니다) 를 사용해 만든 달인의 대표 메뉴 입니다',
      imageUrl: '/images/menu3.png',
      price: '15,000원',
    },
    {
      title: '한우 갈비탕',
      soup: '600g 2포',
      meat: '국내산 한우갈비 220g',
      description:
        '본 메뉴의 육수는 한우곰탕 육수와 같은 방법으로 만들었고 고기는\n 100% 국내산 한우를 사용해 만든 달인의 대표 메뉴입니다',
      imageUrl: '/images/menu1.png',
      price: '18,000원',
    },
  ]
  return (
    <div css={{ marginTop: `${getSize(60)}px` }}>
      <CSText
        size={24}
        fontFamily={'SeoulHangangEB'}
        color={'#3e3737'}
        lineHeight={0.83}
        textAlignCenter
        marginBottom={10}
      >
        메뉴 소개
      </CSText>

      {menuData.map((data, index) => (
        <div key={index}>
          <div
            css={[
              introMenuBox,
              {
                marginTop: `${getSize(30)}px`,
                display: 'flex',
                whiteSpace: 'pre-line',
              },
            ]}
          >
            <div css={[agingText, { paddingLeft: `${getSize(20)}px` }]}>
              <CSText size={10} color={'#15c9de'} lineHeight={2} marginTop={4}>
                달인의 가마솥
              </CSText>
              <CSText
                size={18}
                color={'#3e3737'}
                lineHeight={1.11}
                fontFamily="PretendardBold"
              >
                {data.title}
              </CSText>
              <CSText
                size={12}
                color={'#818181'}
                lineHeight={1.67}
                marginTop={21}
              >
                {`한우육수: ${data.soup}`}
              </CSText>
              <CSText size={12} color={'#818181'} lineHeight={1.67}>
                {`고기: ${data.meat}`}
              </CSText>
              <CSText
                size={18}
                lineHeight={1.11}
                fontFamily="PretendardBold"
                marginTop={20}
              >
                {data.price}
              </CSText>
            </div>
            <div css={[agingImage]}>
              <AutoSizeImage
                src={data.imageUrl}
                width={toSize(width, height, 180)}
                height={toSize(width, height, 162)}
              />
            </div>
          </div>
          <div
            css={[
              menuDescription,
              {
                padding: `${getSize(25)}px ${getSize(25)}px`,
                height: `${getSize(100)}px`,
              },
            ]}
          >
            <CSText size={12} color="#fff" lineHeight={1.5}>
              {data.description}
            </CSText>
          </div>
        </div>
      ))}
    </div>
  )
}

const introMenuBox = css`
  width: 100%;
`
const agingText = css`
  width: 50%;
`
const agingImage = css`
  width: 50%;
`

const menuDescription = css`
  width: 100%;
  border-top-left-radius: 16px;
  background-color: #15c9de;
`

export default IntroMenuSection
