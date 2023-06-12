import Button from '@components/Button'
import React from 'react'
import Divider from '@mui/material/Divider'
import { useRouter } from 'next/router'

const DrawerList = () => {
  const router = useRouter()

  return (
    <>
      <div
        style={{
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
    </>
  )
}

export default DrawerList
