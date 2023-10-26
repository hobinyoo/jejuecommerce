import AutoSizeImage from '@components/cs/AutoSizeImage'
import CSText from '@components/cs/CSText'
import { css } from '@emotion/react'
import React from 'react'
import { RootState, useAppSelector } from 'src/store'
import { toSize } from 'styles/globalStyle'

const ChangeRefundSection = () => {
  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )
  const getSize = (input: number) => {
    return toSize(width, height, input)
  }
  return (
    <div css={container}>
      <div css={{ marginLeft: `${getSize(20)}px` }}>
        <CSText
          size={16}
          fontFamily={'PretendardBold'}
          color={'#3e3737'}
          marginTop={30}
          lineHeight={1.25}
        >
          {'반품/환불/교환 안내'}
        </CSText>
        <div css={[possibleImpossible, { marginTop: `${getSize(20)}px` }]}>
          <AutoSizeImage
            src={'/images/ico_no@3x.png'}
            width={getSize(12)}
            height={getSize(12)}
          />
          <CSText size={14} color={'#3e3737'} lineHeight={1.43} marginLeft={4}>
            {'교환 및 반품이 어려울 경우'}
          </CSText>
        </div>
        <CSText size={13} color={'#3e3737'} lineHeight={1.54} marginTop={15}>
          {'· 재판매가 불가한 신선식품의 특성상 단순 변심, 주문착오,'}
        </CSText>
        <CSText size={13} color={'#3e3737'} lineHeight={1.54} marginLeft={5.8}>
          {'일정 변경, 맛의 기호에 따른 판단, 안내된 보관 방법과 기한을'}
        </CSText>
        <CSText size={13} color={'#3e3737'} lineHeight={1.54} marginLeft={5.8}>
          {'따르지 않은 경우'}
        </CSText>
        <CSText size={13} color={'#3e3737'} lineHeight={1.54} marginTop={15}>
          {'· 소비자의 책임이 있는 사유로 상품이 훼손되거나'}
        </CSText>
        <CSText size={13} color={'#3e3737'} lineHeight={1.54} marginLeft={5.8}>
          {'분실된 경우'}
        </CSText>
        <div css={[possibleImpossible, { marginTop: `${getSize(30)}px` }]}>
          <AutoSizeImage
            src={'/images/ico_check@3x.png'}
            width={getSize(12)}
            height={getSize(12)}
          />
          <CSText size={14} color={'#3e3737'} lineHeight={1.43} marginLeft={4}>
            {'교환 및 반품이 가능한 경우'}
          </CSText>
        </div>
        <CSText
          size={13}
          color={'#3e3737'}
          lineHeight={1.54}
          marginTop={15}
          marginBottom={30}
        >
          {'· 상품 도착일에 제품이 변질되거나 제품 포장이 파손된 경우'}
        </CSText>
      </div>
      <div
        css={[
          call,
          {
            width: '100%',
            height: `${getSize(150)}px`,
          },
        ]}
      >
        <CSText size={15} color={'#3e3737'} lineHeight={1.33} marginTop={30}>
          {'매장으로 연락주시면 친절히 교환 및 환불 진행'}
        </CSText>
        <CSText size={15} color={'#3e3737'} lineHeight={1.33}>
          {'도와드리겠습니다.'}
        </CSText>
        <div
          css={[
            number,
            {
              width: `${getSize(320)}px`,
              height: `${getSize(34)}px`,
              borderRadius: `${getSize(17)}px`,
              marginTop: `${getSize(18)}px`,
            },
          ]}
        >
          <AutoSizeImage
            src={'/images/ico_call@3x.png'}
            width={getSize(15)}
            height={getSize(15)}
          />
          <CSText size={14} color={'#fff'} lineHeight={1.43} marginLeft={6}>
            {'전화번호: 070-5421-5644'}
          </CSText>
        </div>
      </div>
    </div>
  )
}
const container = css`
  width: 100%;
`

const possibleImpossible = css`
  display: flex;
  align-items: center;
`
const call = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #dfd6c7;
`
const number = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #bfb5a3;
`
export default ChangeRefundSection
