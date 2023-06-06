import { css } from '@emotion/react'
import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/router'

const Header = () => {
  const router = useRouter()

  return (
    <div css={container}>
      <ArrowBackIcon css={arrowIcon} onClick={() => router.back()} />
      <p>{router?.pathname === '/signUp' ? '회원가입' : '로그인'}</p>
      <p>{''}</p>
    </div>
  )
}
const container = css`
  width: 100%;
  padding: 1.5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const arrowIcon = css`
  width: 1.5rem;
  height: 1.5rem;
`
export default Header
