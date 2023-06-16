import Button from '@components/Button'
import React from 'react'
import Divider from '@mui/material/Divider'
import { useRouter } from 'next/router'
import { auth } from '@firebase/initFirebase'

const DrawerList = () => {
  const router = useRouter()

  const userId = auth.currentUser?.uid
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
        <Button onClick={() => router.push('/signUp')}>가입하기</Button>
        <Button onClick={() => router.push('/signIn')}>로그인</Button>
      </div>
      <Divider />
      <div
        css={{
          width: '13rem',
          padding: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button onClick={() => router.push(`/orderDetail?userId=${userId}`)}>
          주문내역
        </Button>
      </div>
      <Divider />
    </>
  )
}

export default DrawerList
