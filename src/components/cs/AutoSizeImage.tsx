import { css } from '@emotion/react'
import Image from 'next/image'
import React from 'react'

interface Props {
  src: string
  width?: number
  height?: number
  borderRadius?: number
  priority?: boolean
  onClick?: () => void
  full?: boolean
  borderTopLeftRadius?: number
}

const AutoSizeImage = ({
  src,
  width,
  height,
  onClick,
  borderRadius,
  borderTopLeftRadius,
  priority = false,
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
          alt={''}
          priority={priority}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMUPXmvHgAE9AI9QFfirwAAAABJRU5ErkJggg=="
        />
      ) : (
        <div
          css={[
            imageWrapper,
            {
              width: `${width}rem`,
              height: `${height}rem`,
            },
          ]}
          onClick={onClick}
        >
          <Image
            src={src}
            fill
            style={{
              objectFit: 'cover',
              borderTopLeftRadius:
                borderTopLeftRadius && `${borderTopLeftRadius}rem`,
              borderRadius: borderRadius && `${borderRadius}rem`,
            }}
            sizes="100%"
            alt=""
            priority={priority}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMUPXmvHgAE9AI9QFfirwAAAABJRU5ErkJggg=="
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
