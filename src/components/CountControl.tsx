import { css } from '@emotion/react'
import React, { Dispatch, SetStateAction } from 'react'
import { useAppSelector, RootState } from 'src/store'
import { toSize } from 'styles/globalStyle'
import AutoSizeImage from './cs/AutoSizeImage'
import CSText from './cs/CSText'

interface Props {
  quantity: number
  setQuantity: Dispatch<SetStateAction<number>>
}

const CountControl = ({ quantity, setQuantity }: Props) => {
  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )
  const getSize = (input: number) => {
    return toSize(width, height, input)
  }

  const clickPlus = () => {
    setQuantity((prev) => prev + 1)
  }

  const clickMinus = () => {
    if (quantity <= 1) return 1
    setQuantity((prev) => prev - 1)
  }
  return (
    <div
      css={[
        count,
        {
          width: `${getSize(110)}px`,
          height: `${getSize(30)}px`,
          marginTop: `${getSize(10)}px`,
        },
      ]}
    >
      <AutoSizeImage
        src={'/images/btn_minus@3x.png'}
        width={getSize(30)}
        height={getSize(30)}
        onClick={clickMinus}
      />
      <div
        css={[
          number,
          {
            width: `${getSize(40)}px`,
            height: `${getSize(30)}px`,
          },
        ]}
      >
        <CSText
          size={14}
          fontFamily={'PretendardRegular'}
          color={'#000'}
          lineHeight={1.14}
        >
          {quantity}
        </CSText>
      </div>
      <AutoSizeImage
        src={'/images/btn_plus@3x.png'}
        width={getSize(30)}
        height={getSize(30)}
        onClick={clickPlus}
      />
    </div>
  )
}

const count = css`
  display: flex;
`
const number = css`
  border-top: solid 1px #ececec;
  border-bottom: solid 1px #ececec;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`
export default CountControl
