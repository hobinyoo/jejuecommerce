import AutoSizeImage from '@components/cs/AutoSizeImage'

import CSText from '@components/cs/CSText'
import { css } from '@emotion/react'
import React from 'react'
import { RootState, useAppSelector } from 'src/store'
import { toSize } from 'styles/globalStyle'

const Method = () => {
  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )

  const getSize = (input: number) => {
    return toSize(width, height, input)
  }

  return (
    <div css={[container, { marginBottom: toSize(width, height, 100) }]}>
      <AutoSizeImage src={'/images/ico_point@3x.png'} width={34} height={20} />
      <CSText
        size={24}
        fontFamily={'GodoB'}
        color={'#3e3737'}
        marginTop={20}
        marginBottom={30}
        lineHeight={1.13}
      >
        {'맛있게 먹는 법 및 보관 방법'}
      </CSText>

      {['STEP 01', 'STEP 02', 'STEP 03'].map((value, key) => {
        return (
          <div
            key={key}
            css={{
              width: `${getSize(320)}px`,
              height: `${getSize(105)}px`,
              borderRadius: `${getSize(12)}px`,
              backgroundColor: '#f3e3dc',
              marginBottom: `${getSize(15)}px`,
              display: 'flex',
              alignItems: 'center',
              padding: `0 ${getSize(20)}px`,
            }}
          >
            <AutoSizeImage
              src={`/images/step_0${key + 1}@3x.png`}
              width={key === 0 ? 93 : key === 1 ? 88 : 83}
              height={key === 0 ? 64 : key === 1 ? 76 : 68}
            />
            {value}
          </div>
        )
      })}
    </div>
  )
}

const container = css`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

export default Method
