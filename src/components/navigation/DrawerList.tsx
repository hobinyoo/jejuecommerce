import Button from '@components/cs/Button'
import React from 'react'
import Divider from '@mui/material/Divider'
import { useRouter } from 'next/router'
import { auth } from 'src/firebase/initFirebase'
import { signOut } from 'firebase/auth'
import { isEmpty } from 'lodash'
import { RootState, useAppSelector } from 'src/store'
import { toSize } from 'styles/globalStyle'
import CSText from '@components/cs/CSText'
import { css } from '@emotion/react'
import AutoSizeImage from '@components/cs/AutoSizeImage'

interface Props {
  uid: string
}

const DrawerList = ({ uid }: Props) => {
  const router = useRouter()

  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )
  const getSize = (input: number) => {
    return toSize(width, height, input)
  }

  const handleLogout = () => {
    signOut(auth)
    window.location.replace('/')
  }

  const handleMyOrder = () => {
    router.push(`/orderDetail?uid=${uid}`)
  }
  return (
    <div
      css={{
        width: `${getSize(240)}px`,
      }}
    >
      {!isEmpty(uid) ? (
        <Button onClick={handleLogout}>로그아웃</Button>
      ) : (
        <div
          onClick={() => router.push('/signIn')}
          css={[
            content,
            {
              height: `${getSize(71)}px`,
              padding: `0 ${getSize(20)}px`,
            },
          ]}
        >
          <div css={{ marginTop: `${getSize(30)}px` }}>
            <AutoSizeImage
              src={'/images/ico_my@3x.png'}
              width={getSize(20)}
              height={getSize(20)}
            />
          </div>

          <CSText
            size={15}
            fontFamily={'PretendardRegular'}
            color={'#3e3737'}
            lineHeight={1.25}
            marginTop={32}
            marginLeft={10}
            marginRight={26}
          >
            {'로그인하기'}
          </CSText>
          <div css={{ marginTop: `${getSize(26)}px` }}>
            <Button onClick={() => router.push('/signUp')} signUp>
              <CSText
                size={13}
                fontFamily={'PretendardRegular'}
                color={'#fff'}
                lineHeight={1.54}
              >
                {'회원가입'}
              </CSText>
            </Button>
          </div>
        </div>
      )}

      <Divider />
      <div
        onClick={handleMyOrder}
        css={[
          content,
          {
            height: `${getSize(58)}px`,
            padding: `0 ${getSize(20)}px`,
          },
        ]}
      >
        <div css={{ marginTop: `${getSize(20)}px` }}>
          <AutoSizeImage
            src={'/images/ico_my@3x.png'}
            width={getSize(20)}
            height={getSize(20)}
          />
        </div>

        <CSText
          size={15}
          fontFamily={'PretendardRegular'}
          color={'#3e3737'}
          lineHeight={1.25}
          marginTop={20}
          marginLeft={10}
          marginRight={26}
        >
          {'주문 내역'}
        </CSText>
      </div>
      <Divider />

      <div
        onClick={() => router.push('/admin')}
        css={[
          content,
          {
            height: `${getSize(58)}px`,
            padding: `0 ${getSize(20)}px`,
          },
        ]}
      >
        <div css={{ marginTop: `${getSize(20)}px` }}>
          <AutoSizeImage
            src={'/images/ico_my@3x.png'}
            width={getSize(20)}
            height={getSize(20)}
          />
        </div>

        <CSText
          size={15}
          fontFamily={'PretendardRegular'}
          color={'#3e3737'}
          lineHeight={1.25}
          marginTop={20}
          marginLeft={10}
          marginRight={26}
        >
          {'관리자'}
        </CSText>
      </div>
      <Divider />
    </div>
  )
}

const content = css`
  width: 100%;
  display: flex;
`

export default DrawerList
