import { css } from '@emotion/react'
import React, { Dispatch, SetStateAction } from 'react'
import DaumPostcode from 'react-daum-postcode'
import { toSize } from 'styles/globalStyle'
import { useAppSelector, RootState } from 'src/store'

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
    <div css={overlay}>
      <div
        css={[
          container,
          {
            padding: `${getSize(20)}px`,
            width: `${getSize(340)}px`,
            height: `${getSize(222)}px`,
            borderRadius: `${getSize(12)}px`,
          },
        ]}
      >
        <DaumPostcode
          onComplete={(data: any) => {
            setPostCode(data.zonecode),
              setAddress(data.address),
              setPostVisible(false)
          }} // 값을 선택할 경우 실행되는 이벤트
          autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
          defaultQuery="판교역로 235" // 팝업을 열때 기본적으로 입력되는 검색어
        />
      </div>
    </div>
  )
}

const overlay = css`
  position: fixed; /* 화면에 고정 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 투명한 검은 배경 */
  z-index: 9999; /* 다른 요소들보다 위에 나타나도록 높은 값 설정 */
  display: flex;
  justify-content: center;
  align-items: center;
`
const container = css`
  background-color: #fff;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
`

export default PostModal
