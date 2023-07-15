import AutoSizeImage from '@components/cs/AutoSizeImage'
import CSSpan from '@components/cs/CSSpan'
import CSText from '@components/cs/CSText'
import { css } from '@emotion/react'
import React from 'react'
import { RootState, useAppSelector } from 'src/store'
import { toSize } from 'styles/globalStyle'
import { rgba } from 'emotion-rgba'

const DeliveryInformSection = () => {
  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )

  const getSize = (input: number) => {
    return toSize(width, height, input)
  }
  return (
    <div
      css={[
        container,
        {
          width: `${getSize(360)}px`,
          height: `${getSize(360)}px`,
        },
      ]}
    >
      <div css={{ marginTop: `${getSize(40)}px` }}>
        <AutoSizeImage
          src={'/images/ico_delivery@3x.png'}
          width={toSize(width, height, 40)}
          height={toSize(width, height, 40)}
        />
      </div>

      <CSText
        size={24}
        fontFamily={'GodoB'}
        color={'#fff'}
        lineHeight={1.13}
        marginTop={20}
        marginBottom={29}
      >
        {'배송안내'}
      </CSText>
      <CSText
        size={15}
        fontFamily={'PretendardRegular'}
        color={'#fff'}
        lineHeight={1.33}
      >
        {'가게 휴무일 (일요일 예시)을 제외한'}
      </CSText>
      <CSText
        size={15}
        fontFamily={'PretendardBold'}
        color={'#fff'}
        lineHeight={1.33}
      >
        {'다음날 오전에 일괄 배송'}
        <CSSpan
          size={15}
          fontFamily={'PretendardRegular'}
          color={'#fff'}
          lineHeight={1.33}
        >
          {'해드리고 있습니다.'}
        </CSSpan>
      </CSText>
      <CSText
        size={12}
        fontFamily={'PretendardRegular'}
        color={`${rgba('#fff', 0.7)}`}
        lineHeight={1.67}
      >
        {'*토요일, 일요일 주문시 월요일 배송'}
      </CSText>
      <CSText
        size={15}
        fontFamily={'PretendardRegular'}
        color={'#fff'}
        lineHeight={1.33}
        marginTop={20}
      >
        {'배송 소요기간은 '}
        <CSSpan
          size={15}
          fontFamily={'PretendardBold'}
          color={'#fff'}
          lineHeight={1.33}
        >
          {'3~4일'}
        </CSSpan>
        <CSSpan
          size={15}
          fontFamily={'PretendardRegular'}
          color={'#fff'}
          lineHeight={1.33}
        >
          {'입니다.'}
        </CSSpan>
      </CSText>
      <CSText
        size={15}
        fontFamily={'PretendardRegular'}
        color={'#fff'}
        lineHeight={1.33}
        marginTop={20}
      >
        {'배송상태는 '}
        <CSSpan
          size={15}
          fontFamily={'PretendardBold'}
          color={'#fff'}
          lineHeight={1.33}
        >
          {'주문내역에서 확인'}
        </CSSpan>
        <CSSpan
          size={15}
          fontFamily={'PretendardRegular'}
          color={'#fff'}
          lineHeight={1.33}
        >
          {'하실 수 있습니다.'}
        </CSSpan>
      </CSText>
    </div>
  )
}

const container = css`
  display: flex;
  align-items: center;
  background-color: #64574f;
  flex-direction: column;
`

export default DeliveryInformSection
