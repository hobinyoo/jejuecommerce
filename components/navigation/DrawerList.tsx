import Button from '@components/Button'
import React from 'react'
import Divider from '@mui/material/Divider'
import { useRouter } from 'next/router'
import { auth } from '@firebase/initFirebase'
import { signOut } from 'firebase/auth'
import { isEmpty } from 'lodash'

interface Props {
  uid: string
}

const DrawerList = ({ uid }: Props) => {
  const router = useRouter()

  const handleLogout = () => {
    signOut(auth)
    window.location.replace('/')
  }

  const handleMyOrder = () => {
    router.push(`/orderDetail?uid=${uid}`)
  }
  return (
    <>
      <div
        css={{
          width: '13rem',
          padding: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {!isEmpty(uid) ? (
          <Button onClick={handleLogout}>로그아웃</Button>
        ) : (
          <>
            <Button onClick={() => router.push('/signUp')}>가입하기</Button>
            <Button onClick={() => router.push('/signIn')}>로그인</Button>
          </>
        )}
      </div>
      <Divider />
      <div
        css={{
          width: '13rem',
          padding: '1rem',
        }}
      >
        <Button onClick={handleMyOrder}>주문내역</Button>
      </div>
      <Divider />

      <div
        css={{
          width: '13rem',
          padding: '1rem',
        }}
      >
        <Button onClick={() => router.push('/admin')}>관리자</Button>
      </div>
      <Divider />
    </>
  )
}

export default DrawerList
