import React, { useRef, useState } from 'react'
import { Rating } from '@mantine/core'
import TextArea from '@components/cs/TextArea'
import { db, storage } from 'src/firebase/initFirebase'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import AutoSizeImage from '@components/cs/AutoSizeImage'
import { useRouter } from 'next/router'
import Button from '@components/cs/Button'
import { css } from '@emotion/react'
import { isEmpty } from 'lodash'
import { doc, updateDoc } from 'firebase/firestore'
import MainHeader from '@components/cs/MainHeader'
import { useAppSelector, RootState } from 'src/store'
import CSText from '@components/cs/CSText'
import { toSize } from 'styles/globalStyle'
import { format } from 'date-fns'

const Comment = () => {
  const [rating, setRating] = useState<number>(0)
  const [content, setContent] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)
  const [images, setImages] = useState<string[]>([])
  const router = useRouter()
  const orderId = router.query.orderId

  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )

  const getSize = (input: number) => {
    return toSize(width, height, input)
  }
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
            })
          }
        )
      })
    }
    if (typeof orderId === 'string') {
      await updateDoc(doc(db, 'orders', orderId), {
        rating: rating,
        content: content,
        commentTimestamp: format(new Date(), 'yyyy/MM/dd HH:mm:ss'),
      })
      alert('저장되었습니다.')
      window.location.replace('/')
    }
  }

  return (
    <div css={container}>
      <MainHeader windowWidth={width} windowHeight={height} uid={''} />
      <div
        css={[
          ratingContainer,
          {
            height: `${getSize(114)}px`,
          },
        ]}
      >
        <CSText
          size={17}
          fontFamily={'PretendardRegular'}
          color={'#000'}
          lineHeight={1.18}
          marginTop={30}
          marginBottom={10}
        >
          {'상품에 만족하셨나요?'}
        </CSText>
        <Rating value={rating} onChange={setRating} size="lg" />
      </div>
      <CSText
        size={17}
        fontFamily={'PretendardRegular'}
        color={'#000'}
        lineHeight={1.18}
      >
        {'후기를 적어주세요'}
      </CSText>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        // multiple
        onChange={handleChange}
      />

      <div style={{ display: 'flex' }}>
        {images &&
          images.length > 0 &&
          images.map((image, idx) => (
            <AutoSizeImage key={idx} src={image} width={100} height={100} />
          ))}
      </div>

      <br />
      <div>
        <TextArea
          name="content"
          placeholder="후기를 작성해주세요."
          content={content}
          setContent={setContent}
        />
      </div>
      <Button
        btnHeight={50}
        backgroundColor={'#000'}
        fontColor={'#fff'}
        fontSize={17}
        onClick={saveComment}
      >
        저장
      </Button>
    </div>
  )
}

const container = css`
  width: 100%;
  height: 100vh;
`

const ratingContainer = css`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-bottom: solid 1px #f2f2f2;
`
export default Comment
