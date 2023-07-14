import { css } from '@emotion/react'
import Image from 'next/image'
import React from 'react'

interface Props {
  src: string
  width: number
  height: number
  onClick?: () => void
  absolute?: boolean
}

const AutoSizeImage = ({ src, width, height, onClick, absolute }: Props) => {
  return (
    <div
      css={[
        imageWrapper,
        {
          width: width,
          height: height,
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
