import React from 'react'
import { CommentProps } from 'types/types'
import AutoSizeImage from './AutoSizeImage'
import { Rating } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'

const Review = () => {
  const { data } = useQuery<{ items: CommentProps[] }, unknown, CommentProps[]>(
    {
      queryKey: [`/api/get-comments`],
      queryFn: () =>
        fetch(`/api/get-comments`).then((res) =>
          res.json().then((data) => data.items)
        ),
    }
  )

  return (
    <>
      {data &&
        data.map((comment, index) => {
          const commentTimestamp = comment.commentTimestamp?.seconds
          const date = new Date(commentTimestamp * 1000)

          const formattedDate = `${date.getFullYear()}-${
            date.getMonth() + 1
          }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

          return (
            <div
              css={{
                border: '1px solid black',
                padding: '0.5rem',
                margin: '1rem 0',
              }}
              key={index}
            >
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
                <span
                  css={{
                    marginRight: '0.3rem',
                    color: 'gray',
                    fontSize: '0.9rem',
                  }}
                >
                  작성날짜: {formattedDate}
                </span>
              </div>
            </div>
          )
        })}
    </>
  )
}
export default Review
