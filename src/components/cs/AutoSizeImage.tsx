import { css } from '@emotion/react'
import Image from 'next/image'
import React from 'react'

interface Props {
  src: string
  width: number
  height: number
  borderRadius?: string
  priority?: boolean
  onClick?: () => void
}

const AutoSizeImage = ({
  src,
  width,
  height,
  onClick,
  borderRadius,
  priority = false,
}: Props) => {
  return (
    <>
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
        <Image
          src={src}
          fill
          style={{ objectFit: 'cover' }}
          sizes="100%"
          alt=""
          priority={priority}
        />
      </div>
    </>
  )
}

const imageWrapper = css`
  display: flex;
  position: relative;
`
export default AutoSizeImage
