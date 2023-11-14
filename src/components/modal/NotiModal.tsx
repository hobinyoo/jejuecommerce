import Button from '@components/cs/Button'
import { css } from '@emotion/react'
import React, { Dispatch, SetStateAction } from 'react'
import { RootState, useAppSelector } from 'src/store'
import { modalOverlay, toSize } from 'styles/globalStyle'
import { useRouter } from 'next/router'
import AutoSizeImage from '@components/cs/AutoSizeImage'

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
    <div css={modalOverlay}>
      <div
        css={[
          modalContainer,
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
            width: '100%',
            height: '100%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div css={btnXWrapper}>
            <AutoSizeImage
              src={'/images/btnX.png'}
              width={getSize(14)}
              height={getSize(14)}
              onClick={() => setOrderVisible(false)}
            />
          </div>

          <div css={btnWrapper}>
            <Button
              onClick={handle.signIn}
              btnWidth={125}
              btnHeight={46}
              backgroundColor="#fff"
              borderColor="#15c9de"
              fontColor="#15c9de"
              fontSize={14}
              borderRadius={4}
            >
              회원주문
            </Button>
            <Button
              onClick={handle.notMember}
              btnWidth={125}
              btnHeight={46}
              backgroundColor="#15c9de"
              borderColor="#15c9de"
              fontColor="#fff"
              fontSize={14}
              borderRadius={4}
            >
              비회원주문
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const modalContainer = css`
  background-color: #fff;
`
const btnXWrapper = css`
  display: flex;
  flex: 1;
  justify-content: end;
`
const btnWrapper = css`
  display: flex;
  justify-content: space-between;
`

export default NotiModal
