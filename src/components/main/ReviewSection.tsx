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
          padding: `${getSize(50)}px ${getSize(20)}px ${getSize(
            40
          )}px ${getSize(20)}px`,
        },
      ]}
    >
      <CSText
        size={24}
        fontFamily="SeoulHangangEB"
        color="#3e3737"
        lineHeight={1.25}
        marginBottom={20}
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
                  height: `${getSize(173)}px`,
                  marginBottom: `${getSize(10)}px`,
                  borderRadius: `${getSize(6)}px`,
                  padding: `0 ${getSize(20)}px`,
                },
              ]}
              key={index}
            >
              <div
                css={[
                  ratingDate,
                  {
                    marginTop: `${getSize(20)}px`,
                  },
                ]}
              >
                <Rating value={comment.rating} size={'xs'} />
                <CSText size={12} color={'#9e9795'} lineHeight={1.67}>
                  {comment.commentTimestamp}
                </CSText>
              </div>
              <CSText
                size={15}
                fontFamily="PretendardBold"
                color={'#3e3737'}
                lineHeight={1.33}
                marginTop={15}
              >
                {comment.menu}
              </CSText>
              <div
                css={{
                  marginTop: `${getSize(10)}px`,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div css={{ width: `${getSize(180)}px` }}>
                  <CSText size={13} color={'#9e9795'} lineHeight={1.54}>
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
