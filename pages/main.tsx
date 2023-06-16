import AutoSizeImage from '@components/AutoSizeImage'
import Button from '@components/Button'
import Header from '@components/MainHeader'
import OrderModal from '@components/modal/OrderModal'
import { css } from '@emotion/react'
import { Rating } from '@mantine/core'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { CommentProps } from 'types/types'

const Main = () => {
  const [orderVisible, setOrderVisible] = useState<boolean>(false)
  const [comments, setComments] = useState<CommentProps[]>([])

  useEffect(() => {
    fetch(`/api/beef/get-comments`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data.items)
      })
      .catch((error) => console.error(error))
  }, [])
  return (
    <div css={container}>
      <Header />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>main</div>
        <div>후기</div>
        {comments &&
          comments.map((comment, index) => {
            const commentTimestamp = comment.commentTimestamp?.seconds
            const date = new Date(commentTimestamp * 1000)

            const formattedDate = `${date.getFullYear()}-${
              date.getMonth() + 1
            }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

            return (
              <div key={index}>
                {comment.images &&
                  comment.images.map((image, imageIndex) => {
                    return (
                      <AutoSizeImage key={imageIndex} src={image} size={100} />
                    )
                  })}
                <div css={{ display: 'flex', alignItems: 'center' }}>
                  <span css={{ marginRight: '0.3rem' }}>평점:</span>
                  <Rating value={comment.rating} />
                </div>
                <div>
                  <span css={{ marginRight: '0.3rem' }}>메뉴:</span>
                  {comment.menu}
                </div>
                <div>
                  <span css={{ marginRight: '0.3rem' }}>작성후기:</span>
                  {comment.content}
                </div>
                <div>
                  <span css={{ marginRight: '0.3rem' }}>작성날짜:</span>
                  {formattedDate}
                </div>
              </div>
            )
          })}
      </div>

      <Button onClick={() => setOrderVisible(true)} bottom>
        주문하기
      </Button>

      {orderVisible && (
        <OrderModal
          orderVisible={orderVisible}
          setOrderVisible={setOrderVisible}
        />
      )}
    </div>
  )
}

const container = css`
  width: 100%;
  height: 100vh;
`

export default Main
