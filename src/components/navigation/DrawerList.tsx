import Button from '@components/cs/Button'
import React, { Dispatch, SetStateAction } from 'react'
import Divider from '@mui/material/Divider'
import { useRouter } from 'next/router'
import { auth } from 'src/firebase/initFirebase'
import { signOut, deleteUser } from 'firebase/auth'
import { isEmpty } from 'lodash'
import CSText from '@components/cs/CSText'
import { css } from '@emotion/react'
import AutoSizeImage from '@components/cs/AutoSizeImage'
import nookies from 'nookies'
import Link from 'next/link'

interface Props {
  uid: string
  name: string
  setOpenDrawer: Dispatch<SetStateAction<boolean>>
  setOrderDetailVisible: Dispatch<SetStateAction<boolean>> | undefined
}

const DrawerList = ({
  uid,
  name,
  setOpenDrawer,
  setOrderDetailVisible,
}: Props) => {
  const router = useRouter()

  const handleLogout = async () => {
    await signOut(auth)
    nookies.destroy(undefined, 'uid', { path: '/' })
    window.location.replace('/')
  }

  const handleMyOrder = () => {
    if (uid) {
      router.push(`/orderDetail?uid=${uid}`)
    } else {
      setOpenDrawer(false)
      setOrderDetailVisible && setOrderDetailVisible(true)
    }
  }

  const handleLeave = async () => {
    try {
      if (auth.currentUser) {
        await deleteUser(auth.currentUser)
        const res = await fetch(`/api/delete-account?id=${uid}`, {
          method: 'POST',
        })
        if (res.ok) {
          alert('정상적으로 탈퇴 되었습니다.')
          window.location.replace('/')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div
      css={{
        width: '24rem',
      }}
    >
      <div
        css={[
          content,
          {
            height: '7.1rem',
            padding: '0 2rem',
          },
        ]}
      >
        <div css={{ marginTop: '3rem' }}>
          <AutoSizeImage src={'/images/ico_my@3x.png'} width={2} height={2} />
        </div>

        <CSText
          onClick={() => isEmpty(name) && router.push('signIn')}
          size={1.5}
          color={'#3e3737'}
          lineHeight={1.25}
          marginTop={3.2}
          marginLeft={1}
          marginRight={2.6}
        >
          {isEmpty(name) ? '로그인' : name}
        </CSText>

        {isEmpty(name) ? (
          <Link href={'/signUp'} css={{ marginTop: '2.6rem' }}>
            <Button
              btnWidth={8}
              btnHeight={3}
              fontColor="#fff"
              fontSize={1.3}
              borderRadius={0.4}
              backgroundColor="#15c9de"
              borderColor="#15c9de"
            >
              <CSText size={1.3} color="#fff" lineHeight={1.54}>
                회원가입
              </CSText>
            </Button>
          </Link>
        ) : (
          <div css={{ marginTop: '2.6rem' }}>
            <Button
              onClick={handleLogout}
              btnWidth={8}
              btnHeight={3}
              fontColor="#fff"
              fontSize={1.3}
              borderRadius={0.4}
              backgroundColor="#15c9de"
              borderColor="#15c9de"
            >
              <CSText size={1.3} color="#fff" lineHeight={1.54}>
                로그아웃
              </CSText>
            </Button>
          </div>
        )}
      </div>

      <Divider />
      <div
        onClick={handleMyOrder}
        css={[
          content,
          {
            height: '5.8rem',
            padding: '0 2rem',
          },
        ]}
      >
        <div css={{ marginTop: '2rem' }}>
          <AutoSizeImage
            src={'/images/ico_list@3x.png'}
            width={1.8}
            height={2}
          />
        </div>

        <CSText
          size={1.5}
          color={'#3e3737'}
          lineHeight={1.25}
          marginTop={2}
          marginLeft={1}
          marginRight={2.6}
        >
          주문 내역
        </CSText>
      </div>
      <Divider />
      <Link href={'/admin'}>
        <div
          css={[
            content,
            {
              height: '5.8rem',
              padding: '0 2rem',
            },
          ]}
        >
          <div css={{ marginTop: '2rem' }}>
            <AutoSizeImage
              src={'/images/ico_setting@3x.png'}
              width={1.9}
              height={2}
            />
          </div>

          <CSText
            size={1.5}
            color={'#3e3737'}
            lineHeight={1.25}
            marginTop={2}
            marginLeft={1}
            marginRight={2.6}
          >
            관리자
          </CSText>
        </div>
      </Link>

      <Divider />
      <div
        css={{
          width: '100%',
          justifyContent: 'center',
          display: 'flex',
          position: 'absolute',
          bottom: '3rem',
        }}
        onClick={handleLeave}
      >
        <CSText
          size={1.5}
          color={'#3e3737'}
          lineHeight={1.33}
          textDecoration={'underline'}
        >
          회원 탈퇴
        </CSText>
      </div>
    </div>
  )
}

const content = css`
  width: 100%;
  display: flex;
`

export default DrawerList
