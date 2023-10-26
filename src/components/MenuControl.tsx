import { css } from '@emotion/react'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { useAppSelector, RootState } from 'src/store'
import { toSize } from 'styles/globalStyle'
import CSText from './cs/CSText'
import AutoSizeImage from './cs/AutoSizeImage'
import { isEmpty } from 'lodash'

interface Props {
  selectMenu: string
  setSelectMenu: Dispatch<SetStateAction<string>>
}

const MenuControl = ({ selectMenu, setSelectMenu }: Props) => {
  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )

  const [openBox, setOpenBox] = useState<boolean>(false)

  const getSize = (input: number) => {
    return toSize(width, height, input)
  }

  const menu = ['한우소고기국밥', '갈비탕', '설렁탕', '곰탕']
  return (
    <div onClick={() => setOpenBox(!openBox)}>
      <div
        css={[
          menuBox,
          {
            width: `${getSize(320)}px`,
            height: `${getSize(46)}px`,
            marginTop: `${getSize(12)}px`,
            padding: `0 ${getSize(20)}px`,
            border: 'solid 1px #ececec',
            borderTopLeftRadius: `${getSize(4)}px`,
            borderTopRightRadius: `${getSize(4)}px`,
            borderBottomRightRadius: openBox ? 'none' : `${getSize(4)}px`,
            borderBottomLeftRadius: openBox ? 'none' : `${getSize(4)}px`,
          },
        ]}
      >
        <CSText size={14} color={'#000'} lineHeight={1.14}>
          {selectMenu}
        </CSText>
        {openBox ? (
          <AutoSizeImage
            src={'/images/dropdown_up@3x.png'}
            width={getSize(30)}
            height={getSize(30)}
          />
        ) : (
          <AutoSizeImage
            src={'/images/dropdown@3x.png'}
            width={getSize(30)}
            height={getSize(30)}
          />
        )}
      </div>
      {openBox &&
        menu.map((value, index) => {
          return (
            <div key={index} onClick={() => setSelectMenu(value)}>
              <div
                css={[
                  menuBox,
                  {
                    width: `${getSize(320)}px`,
                    height: `${getSize(46)}px`,
                    padding: `0 ${getSize(20)}px`,
                    borderLeft: 'solid 1px #ececec',
                    borderRight: 'solid 1px #ececec',
                    borderBottom: 'solid 1px #ececec',
                  },
                ]}
              >
                <CSText size={14} color={'#000'} lineHeight={1.14}>
                  {value}
                </CSText>
              </div>
            </div>
          )
        })}
    </div>
  )
}

const menuBox = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export default MenuControl
