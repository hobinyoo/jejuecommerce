import React from 'react'

interface Props {
  backgroundColor: string
}
const Line = ({ backgroundColor }: Props) => {
  return (
    <div
      css={{
        width: '100%',
        height: '1rem',
        backgroundColor: backgroundColor,
      }}
    />
  )
}

export default Line
