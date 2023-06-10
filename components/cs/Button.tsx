import React, { ReactNode } from 'react'
import { css } from '@emotion/react'

type ButtonProps = {
  children: ReactNode
  onClick: () => void
  order?: boolean
  id?: string
}

const Button = ({ id, children, onClick, order = false }: ButtonProps) => {
  return (
    <button
      id={id ?? ''}
      css={order ? [button, orderButton] : button}
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

const orderButton = css`
  width: calc(100% - 4rem);
  position: absolute;
  bottom: 0;
  margin-bottom: 2rem;
`

export default Button
