import Button from '@components/Button'
import styled from '@emotion/styled'
import Image from 'next/image'
import React, { useRef, useState } from 'react'

export default function upload() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState('')

  const handleUpload = () => {
    if (inputRef.current && inputRef.current.files) {
      const fd = new FormData()

      fd.append(
        'image',
        inputRef.current.files[0],
        inputRef.current.files[0].name
      )
      fetch(
        'https://api.imgbb.com/1/upload?key=845c19915891d9af8f207da85b000cfd',
        {
          method: 'POST',
          body: fd,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setImage(data.data.image.url)
        })
        .catch((error) => console.log(error))
    }
  }
  return (
    <div>
      <input ref={inputRef} type="file" accept="image/*" />
      <Button onClick={handleUpload}>업로드</Button>
      {image !== '' && (
        <AutoSizeImageWrapper>
          <Image
            src={image}
            fill
            style={{ objectFit: 'contain', objectPosition: 'center' }}
            alt=""
          />
        </AutoSizeImageWrapper>
      )}
    </div>
  )
}

const AutoSizeImageWrapper = styled.div`
  width: 500px;
  height: 500px;
  position: relative;
`
