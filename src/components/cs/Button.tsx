import React, { ReactNode } from 'react'
import { css } from '@emotion/react'
import CSText from './CSText'

interface Props {
  children: ReactNode
  onClick: () => void
  id?: string
  marginTop?: number
  btnWidth?: number
  btnHeight: number
  backgroundColor?: string
  fontSize: number
  fontColor?: string
  borderRadius?: number
  borderColor?: string
  disabled?: boolean
}

const Button = ({
  id,
  children,
  onClick,
  marginTop,
  btnWidth,
  btnHeight,
  backgroundColor,
  fontSize,
  fontColor,
  borderRadius,
  borderColor,
  disabled,
}: Props) => {
  return (
    <button
      id={id ?? ''}
      css={[
        button,
        {
          width: btnWidth ? `${btnWidth}rem` : '100%',
          height: `${btnHeight}rem`,
          borderRadius: borderRadius ? `${borderRadius}rem` : 'none',
          marginTop: marginTop ? `${marginTop}rem` : 0,
          backgroundColor: backgroundColor ? backgroundColor : '#000',
          border: `1px solid ${borderColor ? borderColor : '#000'}`,
        },
      ]}
      onClick={onClick}
      disabled={disabled}
    >
      <CSText size={fontSize} color={fontColor} lineHeight={1.18}>
        {children}
      </CSText>
    </button>
  )
}

const button = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Button
