import AutoSizeImage from '@components/cs/AutoSizeImage'
import CSText from '@components/cs/CSText'
import { css } from '@emotion/react'
import React from 'react'

const ChangeRefundSection = () => {
  return (
    <div css={container}>
      <div
        css={{
          padding: '3rem 2rem 4.1rem 2rem',
        }}
      >
        <CSText
          size={1.6}
          fontFamily={'PretendardBold'}
          color={'#3e3737'}
          marginTop={3}
          lineHeight={1.25}
        >
          {'반품/환불/교환 안내'}
        </CSText>
        <div css={[possibleImpossible, { marginTop: '2rem' }]}>
          <AutoSizeImage src={'/images/no.png'} width={1.2} height={1.2} />
          <CSText
            size={1.4}
            color={'#e60000'}
            lineHeight={1.43}
            marginLeft={0.4}
          >
            {'교환 및 반품이 어려울 경우'}
          </CSText>
        </div>
        <CSText size={1.3} color={'#3e3737'} lineHeight={1.54} marginTop={1.5}>
          {'· 재판매가 불가한 신선식품의 특성상 단순 변심, 주문착오,'}
        </CSText>
        <CSText
          size={1.3}
          color={'#3e3737'}
          lineHeight={1.54}
          marginLeft={0.58}
        >
          {'일정 변경, 맛의 기호에 따른 판단, 안내된 보관 방법과 기한을'}
        </CSText>
        <CSText
          size={1.3}
          color={'#3e3737'}
          lineHeight={1.54}
          marginLeft={0.58}
        >
          {'따르지 않은 경우'}
        </CSText>
        <CSText size={1.3} color={'#3e3737'} lineHeight={1.54} marginTop={1.5}>
          {'· 소비자의 책임이 있는 사유로 상품이 훼손되거나 분실된 경우'}
        </CSText>
        <div css={[possibleImpossible, { marginTop: '3rem' }]}>
          <AutoSizeImage src={'/images/check.png'} width={1.2} height={1.2} />
          <CSText
            size={1.4}
            color={'#2d8fbb'}
            lineHeight={1.43}
            marginLeft={0.4}
          >
            {'교환 및 반품이 가능한 경우'}
          </CSText>
        </div>
        <CSText size={1.3} color={'#3e3737'} lineHeight={1.54} marginTop={1.5}>
          {'· 상품 도착일에 제품이 변질되거나 제품 포장이 파손된 경우'}
        </CSText>
      </div>
      <div
        css={[
          call,
          {
            width: '100%',
            height: '15rem',
          },
        ]}
      >
        <CSText size={1.5} color={'#3e3737'} lineHeight={1.33}>
          {'매장으로 연락주시면 친절히 교환 및 환불 진행'}
        </CSText>
        <CSText size={1.5} color={'#3e3737'} lineHeight={1.33}>
          {'도와드리겠습니다.'}
        </CSText>
        <div
          css={[
            number,
            {
              width: '32rem',
              height: '3.4rem',
              borderRadius: '1.7rem',
              marginTop: '1.8rem',
            },
          ]}
        >
          <AutoSizeImage
            src={'/images/ico_call@3x.png'}
            width={1.5}
            height={1.5}
          />
          <CSText size={1.4} color="#fff" lineHeight={1.43} marginLeft={0.6}>
            {'전화번호: 064-711-6465'}
          </CSText>
        </div>
      </div>
    </div>
  )
}
const container = css`
  width: 100%;
  background-color: #f3f3f3;
`

const possibleImpossible = css`
  display: flex;
  align-items: center;
`
const call = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f3f3f3;
`
const number = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #77bfdf;
`
export default ChangeRefundSection
