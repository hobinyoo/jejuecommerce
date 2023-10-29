import { css } from '@emotion/react'
import Image from 'next/image'
import React from 'react'

interface Props {
  src: string
  width: number
  height: number
  borderRadius?: string
  onClick?: () => void
}

const AutoSizeImage = ({
  src,
  width,
  height,
  onClick,
  borderRadius,
}: Props) => {
  return (
    <div
      css={[
        imageWrapper,
        {
          width: `${width}px`,
          height: `${height}px`,
          borderRadius: borderRadius ? borderRadius : 0,
        },
      ]}
      onClick={onClick}
    >
      <Image src={src} fill style={{ objectFit: 'cover' }} alt="" />
    </div>
  )
}

const imageWrapper = css`
  display: flex;
  position: relative;
`
export default AutoSizeImage
