import React, { useState } from 'react'
import { auth } from '../firebase/initFirebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Button from '@components/cs/Button'
import { css } from '@emotion/react'
import InputText from '@components/cs/InputText'
import { emailValidation, passwordValidation } from 'src/function/vaildation'
import { isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import MainHeader from '@components/cs/MainHeader'
import AutoSizeImage from '@components/cs/AutoSizeImage'
import Loading from '@components/Loading'

const SignIn = () => {
  const router = useRouter()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [loading, setLoading] = useState<boolean>(false)

  const fillUserInfo = () => {
    if (
      !isEmpty(email) &&
      !isEmpty(password) &&
      emailValidation(email) &&
      passwordValidation(password)
    ) {
      return true
    } else {
      return false
    }
  }

  const signIn = async () => {
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        async (_userCredential) => {
          alert('로그인이 되었습니다.')
          setLoading(false)
          window.location.replace('/')
        }
      )
    } catch (err: any) {
      setLoading(false)
      switch (err.code) {
        case 'auth/user-not-found':
          alert('잘못된 이메일 주소입니다.')
          break
        case 'auth/wrong-password':
          alert('올바른 비밀번호를 입력해주세요.')
          break
      }
    }
  }

  return (
    <div css={container}>
      <MainHeader uid={''} />
      <div
        css={[
          signInWrapper,
          {
            padding: '0 3rem',
            height: 'calc(100vh - 8rem)',
          },
        ]}
      >
        <div css={{ marginTop: '5rem' }}>
          <AutoSizeImage
            src="/images/jujueLogo.png"
            width={17.7}
            height={13.3}
          />
        </div>

        <div css={[inputWrapper, { marginTop: '4rem' }]}>
          <InputText
            name=""
            placeholder="이메일을 입력해주세요."
            setInputText={setEmail}
            inputText={email}
          />

          <InputText
            name=""
            placeholder="비밀번호를 입력해주세요."
            setInputText={setPassword}
            inputText={password}
            passwordType
            marginTop={2}
          />

          <div>
            <Button
              onClick={signIn}
              btnHeight={4.6}
              backgroundColor="#15c9de"
              fontColor="#fff"
              fontSize={1.5}
              borderColor="#15c9de"
              marginTop={3}
              borderRadius={0.8}
              disabled={!fillUserInfo()}
            >
              로그인
            </Button>
            <Button
              onClick={() => router.push('/signUp')}
              btnHeight={4.6}
              backgroundColor="#fff"
              fontColor="#15c9de"
              fontSize={1.4}
              borderRadius={0.8}
              marginTop={1}
              borderColor="#15c9de"
            >
              회원가입
            </Button>
          </div>
        </div>
      </div>
      {loading && <Loading />}
    </div>
  )
}

const container = css`
  width: 100%;
`
const signInWrapper = css`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  position: relative;
`
const inputWrapper = css`
  width: 100%;
`

export default SignIn
