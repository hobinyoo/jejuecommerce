import React from 'react'
import { RootState, useAppSelector } from 'src/store'
import { toSize } from 'styles/globalStyle'

interface Props {
  backgroundColor: string
}
const Line = ({ backgroundColor }: Props) => {
  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )
  return (
    <div
      css={{
        width: '100%',
        height: toSize(width, height, 10),
        backgroundColor: backgroundColor,
      }}
    />
  )
}

export default Line
