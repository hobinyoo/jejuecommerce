import React, { ReactNode } from 'react'
import { css } from '@emotion/react'
import { toSize } from 'styles/globalStyle'
import { RootState, useAppSelector } from 'src/store'

interface Props {
  children: ReactNode
}

const CSText = ({ children }: Props) => {
  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )

  return (
    <div css={[Text, { fontSize: toSize(width, height, 24) }]}>{children}</div>
  )
}

const Text = css`
  font-family: 'PretendardBold';
  margin: 20px 184px 10px 20px;
  line-height: 0.83;
  letter-spacing: normal;
  color: #3e3737;
`
export default CSText
