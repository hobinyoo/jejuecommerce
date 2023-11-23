import React, { Dispatch, SetStateAction } from 'react'
import DaumPostcode from 'react-daum-postcode'
import { modalContainer, modalOverlay } from 'styles/globalStyle'

import AutoSizeImage from '@components/cs/AutoSizeImage'
import { css } from '@emotion/react'

interface Props {
  setPostVisible: Dispatch<SetStateAction<boolean>>
  setAddress: Dispatch<SetStateAction<string>>
  setPostCode: Dispatch<SetStateAction<string>>
}

const PostModal = ({ setPostVisible, setAddress, setPostCode }: Props) => {
  return (
    <div css={modalOverlay}>
      <div
        css={[
          modalContainer,
          {
            padding: '2rem',
            width: '34rem',
            height: '52rem',
            borderRadius: '1.2rem',
          },
        ]}
      >
        <div css={btnXWrapper}>
          <AutoSizeImage
            src="/images/btnX.png"
            width={1.4}
            height={1.4}
            onClick={() => setPostVisible(false)}
          />
        </div>
        <DaumPostcode
          onComplete={(data: any) => {
            setPostCode(data.zonecode),
              setAddress(data.address),
              setPostVisible(false)
          }} // 값을 선택할 경우 실행되는 이벤트
          autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
          defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  )
}

const btnXWrapper = css`
  display: flex;
  justify-content: end;
  margin-bottom: 20px;
`

export default PostModal
