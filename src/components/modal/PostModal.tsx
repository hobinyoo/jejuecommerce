import React, { Dispatch, SetStateAction } from 'react'
import DaumPostcode from 'react-daum-postcode'
import { modalContainer, modalOverlay, toSize } from 'styles/globalStyle'
import { useAppSelector, RootState } from 'src/store'
import AutoSizeImage from '@components/cs/AutoSizeImage'
import { css } from '@emotion/react'

interface Props {
  setPostVisible: Dispatch<SetStateAction<boolean>>
  setAddress: Dispatch<SetStateAction<string>>
  setPostCode: Dispatch<SetStateAction<string>>
}

const PostModal = ({ setPostVisible, setAddress, setPostCode }: Props) => {
  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )
  const getSize = (input: number) => {
    return toSize(width, height, input)
  }

  return (
    <div css={modalOverlay}>
      <div
        css={[
          modalContainer,
          {
            padding: `${getSize(20)}px`,
            width: `${getSize(340)}px`,
            height: `${getSize(520)}px`,
            borderRadius: `${getSize(12)}px`,
          },
        ]}
      >
        <div css={btnXWrapper}>
          <AutoSizeImage
            src="/images/btnX.png"
            width={getSize(14)}
            height={getSize(14)}
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
          defaultQuery="판교역로 235" // 팝업을 열때 기본적으로 입력되는 검색어
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
