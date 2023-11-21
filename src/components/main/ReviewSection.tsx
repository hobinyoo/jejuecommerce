import React from 'react'
import { CommentProps } from 'types/types'

import { Rating } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import AutoSizeImage from '@components/cs/AutoSizeImage'
import { css } from '@emotion/react'
import CSText from '@components/cs/CSText'
import { RootState, useAppSelector } from 'src/store'
import { toSize } from 'styles/globalStyle'

const ReviewSection = () => {
  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )
  const getSize = (input: number) => {
    return toSize(width, height, input)
  }

  //인자값 순서대로 data안에 있는 item 타입, error 타입, queryFn 반환 타입
  const { data } = useQuery<{ items: CommentProps[] }, unknown, CommentProps[]>(
    {
      queryKey: ['/api/get-comments'],
      queryFn: () =>
        fetch('/api/get-comments').then((res) =>
          res.json().then((data) => data.items)
        ),
    }
  )

  return (
    <div
      css={[
        container,
        {
          padding: '5rem 2rem 4rem 2rem',
        },
      ]}
    >
      <CSText
        size={2.4}
        fontFamily="SeoulHangangEB"
        color="#3e3737"
        lineHeight={1.25}
        marginBottom={2}
        textAlignCenter
      >
        구매 후기
      </CSText>

      {data &&
        data.map((comment, index) => {
          return (
            <div
              css={[
                review,
                {
                  height: '17.3rem',
                  marginBottom: '1rem',
                  borderRadius: '0.6rem',
                  padding: '0 2rem',
                },
              ]}
              key={index}
            >
              <div
                css={[
                  ratingDate,
                  {
                    marginTop: '2rem',
                  },
                ]}
              >
                <Rating value={comment.rating} size={'xs'} />
                <CSText size={1.2} color={'#9e9795'} lineHeight={1.67}>
                  {comment.commentTimestamp}
                </CSText>
              </div>
              <CSText
                size={1.5}
                fontFamily="PretendardBold"
                color={'#3e3737'}
                lineHeight={1.33}
                marginTop={1.5}
              >
                {comment.menu}
              </CSText>
              <div
                css={{
                  marginTop: '2rem',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div css={{ width: '18rem' }}>
                  <CSText size={1.3} color={'#9e9795'} lineHeight={1.54}>
                    {comment.content}
                  </CSText>
                </div>
                <AutoSizeImage
                  src={
                    comment.images ? comment.images[0] : '/images/no_img.png'
                  }
                  width={getSize(80)}
                  height={getSize(80)}
                />
              </div>
            </div>
          )
        })}
    </div>
  )
}

const container = css`
  width: 100%;
`
const review = css`
  width: 100%;
  background-color: #fff;
  border: solid 1px #ececec;
`
const ratingDate = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export default ReviewSection
