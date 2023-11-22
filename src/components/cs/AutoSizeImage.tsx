import { css } from '@emotion/react'
import Image from 'next/image'
import React from 'react'

interface Props {
  src: string
  width?: number
  height?: number
  borderRadius?: string

  onClick?: () => void
  full?: boolean
}

const AutoSizeImage = ({
  src,
  width,
  height,
  onClick,
  borderRadius,

  full = false,
}: Props) => {
  return (
    <>
      {full ? (
        <Image
          src={src}
          width={0}
          height={0}
          sizes="100%"
          css={{ width: '100%', height: 'auto' }}
          alt=""
          priority
        />
      ) : (
        <div
          css={[
            imageWrapper,
            {
              width: `${width}rem`,
              height: `${height}rem`,
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
            priority
          />
        </div>
      )}
    </>
  )
}

const imageWrapper = css`
  display: flex;
  position: relative;
`
export default AutoSizeImage
