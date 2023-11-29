import Button from '@components/cs/Button'
import { css } from '@emotion/react'
import React, { Dispatch, SetStateAction } from 'react'
import { modalOverlay } from 'styles/globalStyle'
import AutoSizeImage from '@components/cs/AutoSizeImage'
import CSText from '@components/cs/CSText'
import Link from 'next/link'

interface Props {
  setNotiVisible: Dispatch<SetStateAction<boolean>>
  setOrderVisible: Dispatch<SetStateAction<boolean>>
}

const NotiModal = ({ setNotiVisible, setOrderVisible }: Props) => {
  const handleNotMember = () => {
    setNotiVisible(false)
    setOrderVisible(true)
  }

  return (
    <div css={modalOverlay}>
      <div
        css={[
          modalContainer,
          {
            padding: '2rem',
            width: '30rem',
            height: '22.2rem',
            borderRadius: '1.2rem',
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
          <div css={{ flex: 1, whiteSpace: 'pre-line' }}>
            <div css={btnXWrapper}>
              <AutoSizeImage
                src="/images/btnX.png"
                width={1.4}
                height={1.4}
                onClick={() => setNotiVisible(false)}
              />
            </div>
            <CSText
              size={1.7}
              fontFamily="PretendardBold"
              lineHeight={1.18}
              textAlignCenter
            >
              회원가입 시 5% 상시할인!
            </CSText>
            <CSText
              size={1.4}
              color="#818181"
              lineHeight={1.18}
              textAlignCenter
              marginTop={2}
            >
              {`회원등록을 해주시는 고객분들께\n 5% 상시 할인을 진행하고 있습니다.`}
            </CSText>
          </div>

          <div css={btnWrapper}>
            <Link href={'/signIn'}>
              <Button
                btnWidth={12.5}
                btnHeight={4.6}
                backgroundColor="#fff"
                borderColor="#15c9de"
                fontColor="#15c9de"
                fontSize={1.4}
                borderRadius={0.4}
              >
                회원주문
              </Button>
            </Link>

            <Button
              onClick={handleNotMember}
              btnWidth={12.5}
              btnHeight={4.6}
              backgroundColor="#15c9de"
              borderColor="#15c9de"
              fontColor="#fff"
              fontSize={1.4}
              borderRadius={0.4}
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
  justify-content: end;
`
const btnWrapper = css`
  display: flex;
  justify-content: space-between;
`

export default NotiModal
