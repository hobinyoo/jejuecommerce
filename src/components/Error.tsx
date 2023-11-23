import React from 'react'

type Props = {
  message: string
}
export const ErrorMessage = ({ message }: Props) => {
  return (
    <div
      css={{
        fontSize: '1rem',
        color: 'red',
        marginTop: '0.6rem',
        marginLeft: '1rem',
      }}
    >
      {message}
    </div>
  )
}

export default ErrorMessage
