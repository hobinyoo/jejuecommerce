import React from 'react'

type Props = {
  message: string
}
export const ErrorMessage = ({ message }: Props) => {
  return <div css={{ fontSize: '0.9rem', color: 'red' }}>{message}</div>
}

export default ErrorMessage
