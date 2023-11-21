import AutoSizeImage from '@components/cs/AutoSizeImage'
import CSText from '@components/cs/CSText'
import { css } from '@emotion/react'
import React from 'react'
import { RootState, useAppSelector } from 'src/store'
import { toSize } from 'styles/globalStyle'

const SafePolicy = () => {
  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )

  const getSize = (input: number) => {
    return toSize(width, height, input)
  }

  return (
    <div css={container}>
      <div
        css={[
          containerInner,
          {
            whiteSpace: 'pre-line',
            padding: `${getSize(24)}px ${getSize(14)}px`,
          },
        ]}
      >
        <div>
          <CSText
            size={2.4}
            fontFamily={'SeoulHangangEB'}
            color="#fff"
            lineHeight={0.83}
            marginBottom={1.6}
          >
            {'달인의 가마솥은'}
          </CSText>
          <CSText size={1.5} color="#fff" lineHeight={1.47}>
            {`100% 국내산 소고기, 신선한 좋은 청정재료를\n사용함으로써 자라나는 어린아이들은 물론\n모든 사람들이 안심하고 먹을 수 있는 으뜸가는 맛\n좋은 먹거리를 책임지겠습니다`}
          </CSText>
        </div>
      </div>

      <AutoSizeImage
        src={'/images/safeBg.png'}
        width={getSize(360)}
        height={getSize(243)}
      />
    </div>
  )
}

const container = css`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

const containerInner = css`
  position: absolute;
  z-index: 1;
`

export default SafePolicy
