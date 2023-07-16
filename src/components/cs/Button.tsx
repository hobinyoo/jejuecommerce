import React, { ReactNode } from 'react'
import { css } from '@emotion/react'
import { useAppSelector, RootState } from 'src/store'
import { toSize } from 'styles/globalStyle'
import CSText from './CSText'

interface Props {
  children: ReactNode
  onClick: () => void
  bottom?: boolean
  id?: string
  signUp?: boolean
}

const Button = ({
  id,
  children,
  onClick,
  bottom = false,
  signUp = false,
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
          width: signUp ? `${getSize(80)}px` : '100%',
          height: signUp ? `${getSize(30)}px` : `${getSize(50)}px`,
          borderRadius: signUp ? `${getSize(4)}px` : 'none',
        },
      ]}
      onClick={onClick}
    >
      <CSText
        size={17}
        fontFamily={'PretendardRegular'}
        color={'#fff'}
        lineHeight={1.18}
      >
        {children}
      </CSText>
    </button>
  )
}

const button = css`
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`

export default Button
