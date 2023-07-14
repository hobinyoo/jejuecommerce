import React from 'react'
import { RootState, useAppSelector } from 'src/store'
import { toSize } from 'styles/globalStyle'

const Line = () => {
  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )
  return (
    <div
      css={{
        width: '100%',
        height: toSize(width, height, 10),
        marginTop: toSize(width, height, 30),
        marginBottom: toSize(width, height, 30),
        backgroundColor: '#f5f0e8',
      }}
    />
  )
}

export default Line
