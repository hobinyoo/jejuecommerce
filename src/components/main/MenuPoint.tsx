import AutoSizeImage from '@components/cs/AutoSizeImage'

import CSText from '@components/cs/CSText'
import { css } from '@emotion/react'
import React from 'react'

const MenuPoint = () => {
  return (
    <div css={[container, { marginBottom: '10rem' }]}>
      <AutoSizeImage src={'/images/ico_point@3x.png'} width={34} height={20} />
      <CSText
        size={24}
        fontFamily="GodoB"
        color="#3e3737"
        marginTop={20}
        marginBottom={50}
        lineHeight={1.13}
      >
        메뉴만의 포인트 및 장점
      </CSText>
      <div
        css={[
          circleContainer,
          {
            padding: '0 2rem',
          },
        ]}
      >
        <div
          css={[
            circle,
            {
              width: '12rem',
              height: '12rem',
              backgroundColor: '#b7ae9f',
              zIndex: 1,
            },
          ]}
        >
          <CSText
            size={14}
            fontFamily="PretendardBold"
            color="#fffcf7"
            lineHeight={1.33}
          >
            {'푸짐한 양의 \n 한우 소고기'}
          </CSText>
        </div>
        <div
          css={[
            circle,
            {
              width: '12rem',
              height: '12rem',
              backgroundColor: '#64574f',
              zIndex: 2,
              marginLeft: '10rem',
              position: 'absolute',
            },
          ]}
        >
          <CSText
            size={14}
            fontFamily="PretendardBold"
            color="#fffcf7"
            lineHeight={1.33}
          >
            {'푹 고아서 \n 만든 진한 \n 사골 육수'}
          </CSText>
        </div>
        <div
          css={[
            circle,
            {
              width: '12rem',
              height: '12rem',
              backgroundColor: '#c79c89',
              zIndex: 1,
              marginLeft: '20rem',
              position: 'absolute',
            },
          ]}
        >
          <CSText
            size={14}
            fontFamily="PretendardBold"
            color={'#fffcf7'}
            lineHeight={1.33}
          >
            {'순수'}
          </CSText>
          <CSText
            size={14}
            fontFamily="PretendardBold"
            color="#fffcf7"
            lineHeight={1.33}
          >
            국내산
          </CSText>
          <CSText
            size={14}
            fontFamily="PretendardBold"
            color="#fffcf7"
            lineHeight={1.33}
          >
            고춧가루와
          </CSText>
          <CSText
            size={14}
            fontFamily="PretendardBold"
            color="#fffcf7"
            lineHeight={1.33}
          >
            우거지
          </CSText>
        </div>
      </div>
    </div>
  )
}

const container = css`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const circleContainer = css`
  width: 100%;
  display: flex;
  position: relative;
`
const circle = css`
  border-radius: 100px;
  white-space: pre-line;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; ;
`

export default MenuPoint
