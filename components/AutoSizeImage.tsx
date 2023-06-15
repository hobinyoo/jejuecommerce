import styled from '@emotion/styled'
import Image from 'next/image'
import React from 'react'

export default function AutoSizeImage({
  src,
  size = 500,
}: {
  src: string
  size?: number
}) {
  return (
    <AutoSizeImageWrapper size={size}>
      <Image
        src={src}
        fill
        style={{ objectFit: 'contain', objectPosition: 'center' }}
        alt=""
      />
    </AutoSizeImageWrapper>
  )
}

const AutoSizeImageWrapper = styled.div<{ size: number }>`
  width: ${(props) => (props.size ? `${props.size}px` : '500px')};
  height: ${(props) => (props.size ? `${props.size}px` : '500px')};
  position: relative;
  display: 'flex';
  width: '100%';
`
