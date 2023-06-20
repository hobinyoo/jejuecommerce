import Button from '@components/Button'
import React from 'react'
import Divider from '@mui/material/Divider'
import { useRouter } from 'next/router'
import { auth } from '@firebase/initFirebase'
import { signOut } from 'firebase/auth'

const DrawerList = () => {
  const router = useRouter()
  const user = auth.currentUser

  const handleLogout = () => {
    signOut(auth)
    window.location.replace('/')
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
        {user ? (
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
        <Button onClick={() => router.push(`/orderDetail?userId=${user?.uid}`)}>
          주문내역
        </Button>
      </div>
      <Divider />

      <Divider />
    </>
  )
}

export default DrawerList
