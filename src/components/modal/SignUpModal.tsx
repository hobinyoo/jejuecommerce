import Button from '@components/cs/Button'
import { css } from '@emotion/react'
import React, { Dispatch, SetStateAction } from 'react'
import CSText from '@components/cs/CSText'

import AutoSizeImage from '@components/cs/AutoSizeImage'
import { useRouter } from 'next/router'
import CSSpan from '@components/cs/CSSpan'

interface Props {
  setSignVisible: Dispatch<SetStateAction<boolean>>
}

const SignUpModal = ({ setSignVisible }: Props) => {
  const router = useRouter()

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
            width: '30rem',
            borderRadius: '1.2rem',
          },
        ]}
      >
        <div
          css={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '1.3rem',
          }}
        >
          <AutoSizeImage
            src="/images/btnX_white.png"
            width={1.4}
            height={1.4}
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
              size={2}
              color="#15c9de"
              marginTop={3}
              lineHeight={1}
              fontFamily="PretendardBold"
              textAlignCenter
            >
              회원가입을 축하
              <CSSpan size={2}>합니다.</CSSpan>
            </CSText>
            <CSText
              size={1.5}
              color="#818181"
              marginTop={1.5}
              lineHeight={1.33}
              textAlignCenter
            >
              {'달인의 가마솥에 오신 걸 환영합니다!\n 상품을 둘러보세요!'}
            </CSText>
          </div>
          <AutoSizeImage src="/images/join_popup_img.png" full />
        </div>

        <Button
          onClick={clickBtn}
          btnHeight={4.6}
          backgroundColor={'#15c9de'}
          fontColor="#fff"
          fontSize={1.4}
          borderRadius={0.8}
          marginTop={1}
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
