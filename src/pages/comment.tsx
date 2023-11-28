import React, { useRef, useState } from 'react'
import { Rating } from '@mantine/core'
import TextArea from '@components/cs/TextArea'
import { db, storage } from 'src/firebase/initFirebase'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import AutoSizeImage from '@components/cs/AutoSizeImage'
import { useRouter } from 'next/router'
import Button from '@components/cs/Button'
import { css } from '@emotion/react'
import { doc, updateDoc } from 'firebase/firestore'
import MainHeader from '@components/cs/MainHeader'
import CSText from '@components/cs/CSText'
import { format } from 'date-fns'
import Loading from '@components/Loading'
import { isEmpty } from 'lodash'

const Comment = () => {
  const router = useRouter()
  const orderId = router.query.orderId
  const [rating, setRating] = useState<number>(0)
  const [content, setContent] = useState<string>('')
  const [images, setImages] = useState<string[]>([])

  const [loading, setLoading] = useState<boolean>(false)

  const inputRef = useRef<HTMLInputElement>(null)
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
    setLoading(true)
    if (!isEmpty(images)) {
      const imagesArray: string[] = []

      images.map((image, index) => {
        const imageRef = ref(storage, `images/${orderId}/image${index}`)

        uploadString(imageRef, image, 'data_url').then(
          async (snapshot: any) => {
            const downloadURL = await getDownloadURL(snapshot.ref)
            imagesArray.push(downloadURL)
            await updateDoc(doc(db, 'orders', String(orderId)), {
              images: imagesArray,
              rating: rating,
              content: content,
              commentTimestamp: format(new Date(), 'yyyy/MM/dd HH:mm:ss'),
            })
            setLoading(false)
            alert('저장되었습니다.')
            window.location.replace('/')
          }
        )
      })
    } else {
      await updateDoc(doc(db, 'orders', String(orderId)), {
        rating: rating,
        content: content,
        commentTimestamp: format(new Date(), 'yyyy/MM/dd HH:mm:ss'),
      })
      setLoading(false)
      alert('저장되었습니다.')
      window.location.replace('/')
    }
  }

  return (
    <div css={container}>
      <MainHeader uid={''} />
      <div
        css={{
          padding: '0 2rem 1.5rem 2rem',
        }}
      >
        <CSText size={2.4} fontFamily="PretendardBold" lineHeight={0.83}>
          후기작성
        </CSText>
        <CSText
          size={1.5}
          color="#818181"
          lineHeight={1.22}
          marginTop={1.2}
          marginBottom={4}
        >
          받으신 상품은 만족하셨나요?
        </CSText>
        <div css={ratingContainer}>
          <Rating value={rating} onChange={setRating} size="lg" />
        </div>
        <CSText size={1.2} lineHeight={1.18} marginTop={5} marginBottom={1}>
          어떤점이 좋으셧나요?
        </CSText>

        <TextArea
          name="content"
          placeholder="후기를 작성해주세요."
          content={content}
          setContent={setContent}
        />
        <label htmlFor="fileInput">
          <input
            id="fileInput"
            ref={inputRef}
            type="file"
            accept="image/*"
            // multiple
            onChange={handleChange}
            hidden
          />
          <div
            css={{
              display: 'flex',
              height: '4.6rem',
              backgroundColor: '#fff',
              borderRadius: '8px',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '1.5rem',
              border: '1px solid #15c9de',
              color: '#15c9de',
              fontFamily: 'PretendardRegular',
              fontSize: '14px',
            }}
          >
            사진추가
          </div>
        </label>

        <div style={{ display: 'flex', marginTop: '1.5rem' }}>
          {images &&
            images.length > 0 &&
            images.map((image, idx) => (
              <AutoSizeImage key={idx} src={image} width={10} height={10} />
            ))}
        </div>
        <Button
          btnHeight={4.6}
          backgroundColor="#15c9de"
          fontColor="#fff"
          fontSize={1.4}
          onClick={saveComment}
          borderRadius={0.8}
          borderColor="#15c9de"
          marginTop={1.5}
        >
          후기 작성 완료
        </Button>
      </div>
      {loading && <Loading />}
    </div>
  )
}

const container = css`
  width: 100%;
`

const ratingContainer = css`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`
export default Comment
