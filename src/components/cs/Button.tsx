import React, { ReactNode } from 'react'
import { css } from '@emotion/react'
import { useAppSelector, RootState } from 'src/store'
import { toSize } from 'styles/globalStyle'
import CSText from './CSText'

interface Props {
  children: ReactNode
  onClick: () => void
  id?: string
  marginTop?: number
  btnWidth?: number
  btnHeight: number
  backgroundColor: string
  fontSize: number
  fontColor: string
  borderRadius?: number
  borderColor?: string
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
}: Props) => {
  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )
  const getSize = (input: number) => {
    return toSize(width, height, input)
  }

  return (
    <button
      id={id ?? ''}
      css={[
        button,
        {
          width: btnWidth ? `${getSize(btnWidth)}px` : '100%',
          height: `${getSize(btnHeight)}px`,

          borderRadius: borderRadius ? `${getSize(borderRadius)}px` : 'none',
          marginTop: marginTop ? `${getSize(marginTop)}px` : 0,
          backgroundColor: backgroundColor,
          border: `1px solid ${borderColor ? borderColor : 'black'}`,
        },
      ]}
      onClick={onClick}
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
