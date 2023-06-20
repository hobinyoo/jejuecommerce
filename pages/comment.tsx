import Header from '@components/Header'
import React, { useRef, useState } from 'react'
import { Rating } from '@mantine/core'
import TextArea from '@components/TextArea'
import { db, storage } from '@firebase/initFirebase'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import AutoSizeImage from '@components/AutoSizeImage'
import { useRouter } from 'next/router'
import Button from '@components/Button'
import { css } from '@emotion/react'
import { isEmpty } from 'lodash'
import { doc, updateDoc } from 'firebase/firestore'

const Comment = () => {
  const [rating, setRating] = useState<number>(0)
  const [content, setContent] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)
  const [images, setImages] = useState<string[]>([])
  const router = useRouter()
  const orderId = router.query.orderId

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const fileArr = e.currentTarget.files

      let fileURLs: string[] = []
      let file: File
      let filesLength = fileArr.length > 6 ? 6 : fileArr.length

      for (let i = 0; i < filesLength; i++) {
        let fileReader = new FileReader()
        file = fileArr[i]
        fileReader.onload = () => {
          fileURLs[i] = fileReader.result as string
          setImages(() => [...fileURLs])
        }
        fileReader.readAsDataURL(file)
      }
    }
  }

  const saveComment = async () => {
    if (!isEmpty(images) && typeof orderId === 'string') {
      const imagesArray: string[] = []
      images.map((image, index) => {
        const imageRef = ref(storage, `images/${orderId}/image${index}`)

        uploadString(imageRef, image, 'data_url').then(
          async (snapshot: any) => {
            const downloadURL = await getDownloadURL(snapshot.ref)
            imagesArray.push(downloadURL)
            await updateDoc(doc(db, 'orders', orderId), {
              images: imagesArray,
              commentTimestamp: new Date(),
            })
          }
        )
      })
    }
    if (typeof orderId === 'string') {
      await updateDoc(doc(db, 'orders', orderId), {
        rating: rating,
        content: content,
      })
      alert('저장되었습니다.')
      window.location.replace('/')
    }
  }
  return (
    <div css={container}>
      <Header />
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
      />

      <div style={{ display: 'flex' }}>
        {images &&
          images.length > 0 &&
          images.map((image, idx) => (
            <AutoSizeImage key={idx} src={image} size={200} />
          ))}
      </div>
      <Rating value={rating} onChange={setRating} size="md" />
      <br />
      <div>
        <TextArea
          name="content"
          placeholder="후기를 작성해주세요."
          content={content}
          setContent={setContent}
        />
      </div>
      <Button bottom onClick={saveComment}>
        저장
      </Button>
    </div>
  )
}

const container = css`
  width: 100%;
  height: 100vh;
`
export default Comment
