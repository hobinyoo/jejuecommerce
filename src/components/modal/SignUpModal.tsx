import Button from '@components/cs/Button'
import { css } from '@emotion/react'
import React, { Dispatch, SetStateAction } from 'react'
import { RootState, useAppSelector } from 'src/store'
import { toSize } from 'styles/globalStyle'
import CSText from '@components/cs/CSText'

import AutoSizeImage from '@components/cs/AutoSizeImage'
import { useRouter } from 'next/router'
import CSSpan from '@components/cs/CSSpan'

interface Props {
  setSignVisible: Dispatch<SetStateAction<boolean>>
}

const SignUpModal = ({ setSignVisible }: Props) => {
  const router = useRouter()
  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )
  const getSize = (input: number) => {
    return toSize(width, height, input)
  }
  const clickBtn = () => {
    setSignVisible(false)
    router.push('/')
  }

  return (
    <div css={overlay}>
      <div
        css={[
          container,
          {
            width: `${getSize(300)}px`,
            borderRadius: `${getSize(12)}px`,
          },
        ]}
      >
        <div
          css={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: `${getSize(13)}px`,
          }}
        >
          <AutoSizeImage
            src="/images/btnX_white.png"
            width={getSize(14)}
            height={getSize(14)}
          />
        </div>
        <div
          css={{
            position: 'relative',
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <div
            css={{
              position: 'absolute',
              zIndex: 1,
              whiteSpace: 'pre-line',
            }}
          >
            <CSText
              size={20}
              color="#15c9de"
              marginTop={30}
              lineHeight={1}
              fontFamily="PretendardBold"
              textAlignCenter
            >
              회원가입을 축하
              <CSSpan size={20} color="#000">
                합니다.
              </CSSpan>
            </CSText>
            <CSText
              size={15}
              color="#818181"
              marginTop={15}
              lineHeight={1.33}
              textAlignCenter
            >
              {'달인의 가마솥에 오신 걸 환영합니다!\n 상품을 둘러보세요!'}
            </CSText>
          </div>
          <AutoSizeImage
            src="/images/join_popup_img.png"
            width={getSize(300)}
            height={getSize(321)}
          />
        </div>

        <Button
          onClick={clickBtn}
          btnHeight={46}
          backgroundColor={'#15c9de'}
          fontColor={'#fff'}
          fontSize={14}
          borderRadius={8}
          marginTop={10}
          borderColor="#15c9de"
        >
          상품 자세히 보러가기
        </Button>
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
  background-color: 'transparent';
`

export default SignUpModal
