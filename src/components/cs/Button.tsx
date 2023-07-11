import React, { ReactNode } from 'react'
import { css } from '@emotion/react'

interface Props {
  children: ReactNode
  onClick: () => void
  bottom?: boolean
  id?: string
}

const Button = ({ id, children, onClick, bottom = false }: Props) => {
  return (
    <button
      id={id ?? ''}
      css={bottom ? [button, bottomButton] : button}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

const button = css`
  padding: 8px;
  border-radius: 8px;
  background-color: black;
  color: white;
`

const bottomButton = css`
  width: calc(100% - 3rem);
  position: absolute;
  bottom: 0;
  margin-bottom: 2rem;
`

export default Button
