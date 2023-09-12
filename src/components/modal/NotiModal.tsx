import Button from '@components/cs/Button'
import { css } from '@emotion/react'
import React, { Dispatch, SetStateAction } from 'react'
import IconX from '/public/X.svg'
import { RootState, useAppSelector } from 'src/store'
import { toSize } from 'styles/globalStyle'
import CSText from '@components/cs/CSText'
import { useRouter } from 'next/router'

interface Props {
  setNotiVisible: Dispatch<SetStateAction<boolean>>
  setOrderVisible: Dispatch<SetStateAction<boolean>>
}

const NotiModal = ({ setNotiVisible, setOrderVisible }: Props) => {
  const router = useRouter()
  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )
  const getSize = (input: number) => {
    return toSize(width, height, input)
  }
  const handle = {
    signIn: () => {
      router.push('/signIn')
    },
    notMember: () => {
      setNotiVisible(false)
      setOrderVisible(true)
    },
  }

  return (
    <div css={overlay}>
      <div
        css={[
          container,
          {
            padding: `${getSize(20)}px`,
            width: `${getSize(300)}px`,
            height: `${getSize(222)}px`,
            borderRadius: `${getSize(12)}px`,
          },
        ]}
      >
        <div
          css={{
            position: 'absolute',
            top: `${getSize(20)}px`,
            right: `${getSize(20)}px`,
          }}
        >
          <IconX onClick={() => setNotiVisible(false)} />
        </div>

        <div
          css={[
            btnWrapper,
            {
              width: `calc(100% - ${getSize(40)}px)`,
              marginBottom: `${getSize(20)}px`,
            },
          ]}
        >
          <Button
            onClick={handle.signIn}
            btnWidth={125}
            btnHeight={46}
            backgroundColor={'#000'}
            fontColor={'#fff'}
            fontSize={14}
            borderRadius={4}
            marginTop={40}
          >
            {'회원주문'}
          </Button>
          <Button
            onClick={handle.notMember}
            btnWidth={125}
            btnHeight={46}
            backgroundColor={'#fff'}
            fontColor={'#000'}
            fontSize={14}
            borderRadius={4}
            marginTop={20}
          >
            {'비회원주문'}
          </Button>
        </div>
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

const btnWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`
export default NotiModal
