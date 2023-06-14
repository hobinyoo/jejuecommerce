import Header from '@components/Header'
import React, { useRef, useState } from 'react'
import { Rating } from '@mantine/core'
import TextArea from '@components/TextArea'
import { storage } from '@firebase/initFirebase'
import {
  ref,
  getDownloadURL,
  listAll,
  uploadBytes,
  uploadString,
} from 'firebase/storage'
import AutoSizeImage from '@components/AutoSizeImage'
import router, { useRouter } from 'next/router'
import Button from '@components/Button'

const Comment = () => {
  const [rating, setRating] = useState<number>(0)
  const [content, setContent] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)
  const [images, setImages] = useState<string[]>([])
  const { orderId } = router.query

  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const fileArr = e.currentTarget.files

      let fileURLs: string[] = []
      let file: File
      let filesLength = fileArr.length > 10 ? 10 : fileArr.length

      for (let i = 0; i < filesLength; i++) {
        let fileReader = new FileReader()
        file = fileArr[i]
        fileReader.onload = () => {
          fileURLs[i] = fileReader.result as string
          setSelectedImages((prev) => [...fileURLs])
        }
        fileReader.readAsDataURL(file)
      }
    }
  }

  const postHandler = async () => {
    selectedImages.map((image, index) => {
      const imageRef = ref(storage, `images/${orderId}/image${index}`)

      uploadString(imageRef, image, 'data_url').then(async (snapshot: any) => {
        console.log('ok')
      })
    })
  }
  return (
    <div css={{ width: '100%' }}>
      <Header />
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
      />
      <Button onClick={postHandler}>저장</Button>
      <div style={{ display: 'flex' }}>
        {images &&
          images.length > 0 &&
          images.map((image, idx) => <AutoSizeImage key={idx} src={image} />)}
      </div>
      <Rating value={rating} onChange={setRating} size="md" />
      <br />
      <TextArea
        name="content"
        placeholder="후기를 작성해주세요."
        content={content}
        setContent={setContent}
      />
    </div>
  )
}

export default Comment
