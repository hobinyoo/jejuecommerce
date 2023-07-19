import React from 'react'

type Props = {
  message: string
}
export const ErrorMessage = ({ message }: Props) => {
  return (
    <div css={{ fontSize: '0.8rem', color: 'red', marginTop: '6px' }}>
      {message}
    </div>
  )
}

export default ErrorMessage
