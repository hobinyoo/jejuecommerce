import { css } from '@emotion/react'
import React, { Dispatch, SetStateAction, useState } from 'react'

import { useAppSelector, RootState } from 'src/store'
import { toSize } from 'styles/globalStyle'
import CSText from './cs/CSText'
import AutoSizeImage from './cs/AutoSizeImage'

interface Props {
  packaging: string
  setPackaging: Dispatch<SetStateAction<string>>
}

const PackagingControl = ({ packaging, setPackaging }: Props) => {
  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )

  const [openBox, setOpenBox] = useState<boolean>(false)

  const getSize = (input: number) => {
    return toSize(width, height, input)
  }
  const selectMethod = (value: string) => {
    setPackaging(value)
    setOpenBox(false)
  }

  const packagingMethod = ['하나로 포장해주세요', '나눠서 포장해주세요']
  return (
    <div onClick={() => setOpenBox(!openBox)}>
      <div
        css={[
          menuBox,
          {
            width: `${getSize(320)}px`,
            height: `${getSize(46)}px`,
            borderRadius: `${getSize(4)}px`,
            marginTop: `${getSize(12)}px`,
            padding: `0 ${getSize(20)}px`,
          },
        ]}
      >
        <CSText
          size={14}
          fontFamily={'PretendardRegular'}
          color={'#000'}
          lineHeight={1.14}
        >
          {'포장 방법 선택'}
        </CSText>
        <AutoSizeImage
          src={'/images/dropdown@3x.png'}
          width={getSize(30)}
          height={getSize(30)}
        />
      </div>
      {openBox &&
        packagingMethod.map((value, index) => {
          return (
            <div key={index} onClick={() => selectMethod(value)}>
              {value}
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
  border: solid 1px #ececec;
`
export default PackagingControl
