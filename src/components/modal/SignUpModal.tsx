import Button from '@components/cs/Button'
import { css } from '@emotion/react'
import React, { Dispatch, SetStateAction } from 'react'
import IconX from '/public/X.svg'
import { RootState, useAppSelector } from 'src/store'
import { toSize } from 'styles/globalStyle'
import CSText from '@components/cs/CSText'

import AutoSizeImage from '@components/cs/AutoSizeImage'
import { useRouter } from 'next/router'

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
            padding: `${getSize(20)}px`,
            width: `${getSize(300)}px`,
            height: `${getSize(420)}px`,
            borderRadius: `${getSize(12)}px`,
          },
        ]}
      >
        <div
          css={{
            position: 'absolute',
            top: `${getSize(14)}px`,
            right: `${getSize(14)}px`,
          }}
        >
          <IconX onClick={() => setSignVisible(false)} />
        </div>
        <div
          css={{
            marginTop: `${getSize(14)}px`,
            marginBottom: `${getSize(14)}px`,
          }}
        >
          <AutoSizeImage
            src="/images/logo@3x.png"
            width={getSize(143)}
            height={getSize(30)}
          />
        </div>
        <AutoSizeImage
          src="/images/illust_done@3x.png"
          width={getSize(200)}
          height={getSize(168)}
        />
        <CSText
          size={20}
          fontFamily={'GodoB'}
          color={'#000'}
          lineHeight={1.5}
          marginTop={25}
        >
          {'환영합니다!'}
        </CSText>
        <CSText size={20} fontFamily={'GodoB'} color={'#000'} lineHeight={1.5}>
          {'회원가입을 축하해요.'}
        </CSText>

        <Button
          onClick={clickBtn}
          btnHeight={46}
          backgroundColor={'#000'}
          fontColor={'#fff'}
          fontSize={14}
          borderRadius={4}
          marginTop={30}
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
  background-color: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
`

export default SignUpModal
