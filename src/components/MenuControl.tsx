import { css } from '@emotion/react'
import React, { Dispatch, SetStateAction } from 'react'

import { useAppSelector, RootState } from 'src/store'
import { toSize } from 'styles/globalStyle'
import CSText from './cs/CSText'

const MenuControl = () => {
  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )
  const getSize = (input: number) => {
    return toSize(width, height, input)
  }
  return (
    <div
      css={[
        menuBox,
        {
          width: `${getSize(320)}px`,
          height: `${getSize(46)}px`,
          borderRadius: `${getSize(4)}px`,
          marginTop: `${getSize(12)}px`,
        },
      ]}
    >
      <CSText
        size={14}
        fontFamily={'PretendardRegular'}
        color={'#000'}
        lineHeight={1.14}
        marginLeft={20}
      >
        {'한우소고기국밥'}
      </CSText>
    </div>
  )
}

const menuBox = css`
  width: 100%;
  display: flex;
  align-items: center;
  border: solid 1px #ececec;
`
export default MenuControl
