import { css } from '@emotion/react'
import Image from 'next/image'
import React from 'react'

interface Props {
  src: string
  width: number
  height: number
  onClick?: () => void
}

const AutoSizeImage = ({ src, width, height, onClick }: Props) => {
  return (
    <div
      css={[
        imageWrapper,
        {
          width: `${width}px`,
          height: `${height}px`,
          position: 'relative',
        },
      ]}
      onClick={onClick}
    >
      <Image src={src} fill style={{ objectFit: 'cover' }} alt="" />
    </div>
  )
}

const imageWrapper = css`
  display: 'flex';
`
export default AutoSizeImage
