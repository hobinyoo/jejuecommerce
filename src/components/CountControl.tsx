import { css } from '@emotion/react'
import React, { Dispatch, SetStateAction } from 'react'
import AutoSizeImage from './cs/AutoSizeImage'
import CSText from './cs/CSText'

interface Props {
  quantity: number[]
  setQuantity: Dispatch<SetStateAction<number[]>>
  index: number
}

const CountControl = ({ quantity, setQuantity, index }: Props) => {
  const clickPlus = () => {
    const newQuantity = [...quantity]
    newQuantity[index] = newQuantity[index] + 1
    setQuantity(newQuantity)
  }

  const clickMinus = () => {
    if (quantity[index] > 0) {
      const newQuantity = [...quantity]
      newQuantity[index] = newQuantity[index] - 1
      setQuantity(newQuantity)
    }
  }
  return (
    <div
      css={[
        count,
        {
          width: '11rem',
          height: '3rem',
        },
      ]}
    >
      <AutoSizeImage
        src={'/images/btn_minus@3x.png'}
        width={3}
        height={3}
        onClick={clickMinus}
      />
      <div
        css={[
          number,
          {
            width: '4rem',
            height: '3rem',
          },
        ]}
      >
        <CSText size={1.4} lineHeight={1.14}>
          {quantity[index]}
        </CSText>
      </div>
      <AutoSizeImage
        src={'/images/btn_plus@3x.png'}
        width={3}
        height={3}
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
