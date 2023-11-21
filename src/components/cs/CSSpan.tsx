import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
  size: number
  fontFamily?: string
  marginTop?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
  color?: string
  lineHeight?: number
  textDecoration?: boolean
  onClick?: () => void
}

const CSSpan = ({
  children,
  size,
  fontFamily,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  color,
  lineHeight,
  textDecoration,
  onClick,
}: Props) => {
  return (
    <span
      onClick={onClick}
      css={[
        {
          fontSize: `${size}rem`,
          fontFamily: fontFamily,
          marginTop: marginTop ? `${marginTop}rem` : 0,
          marginBottom: marginBottom ? `${marginBottom}rem` : 0,
          marginLeft: marginLeft ? `${marginLeft}rem` : 0,
          marginRight: marginRight ? `${marginRight}rem` : 0,
          color: color ? color : '#000',
          lineHeight: lineHeight ? lineHeight : 1,
          textDecoration: textDecoration ? 'underline' : 'none',
        },
      ]}
    >
      {children}
    </span>
  )
}

export default CSSpan
