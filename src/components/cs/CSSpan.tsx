import React, { ReactNode } from 'react'
import { toSize } from 'styles/globalStyle'
import { RootState, useAppSelector } from 'src/store'

interface Props {
  children: ReactNode
  size: number
  fontFamily: string
  marginTop?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
  color?: string
  lineHeight?: number
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
}: Props) => {
  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )

  return (
    <span
      css={[
        {
          fontSize: toSize(width, height, size),
          fontFamily: fontFamily,
          marginTop: marginTop ? toSize(width, height, marginTop) : 0,
          marginBottom: marginBottom ? toSize(width, height, marginBottom) : 0,
          marginLeft: marginLeft ? toSize(width, height, marginLeft) : 0,
          marginRight: marginRight ? toSize(width, height, marginRight) : 0,
          color: color ? color : '#000',
          lineHeight: lineHeight ? lineHeight : 1,
        },
      ]}
    >
      {children}
    </span>
  )
}

export default CSSpan
