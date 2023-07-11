import styled from '@emotion/styled'
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
    <AutoSizeImageWrapper width={width} height={height} onClick={onClick}>
      <Image src={src} fill style={{ objectFit: 'cover' }} alt="" />
    </AutoSizeImageWrapper>
  )
}

const AutoSizeImageWrapper = styled.div<{ width: number; height: number }>`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  position: relative;
  display: 'flex';
`
export default AutoSizeImage
