import React, { useState } from 'react'
import { auth } from '../firebase/initFirebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Button from '@components/cs/Button'
import { css } from '@emotion/react'
import InputText from '@components/cs/InputText'
import { emailValidation, passwordValidation } from 'src/function/vaildation'
import ErrorMessage from '@components/Error'
import { isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import { useAppSelector, RootState } from 'src/store'
import MainHeader from '@components/cs/MainHeader'
import AutoSizeImage from '@components/cs/AutoSizeImage'
import { toSize } from 'styles/globalStyle'
import CSText from '@components/cs/CSText'

const SignIn = () => {
  const router = useRouter()

  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )

  const getSize = (input: number) => {
    return toSize(width, height, input)
  }

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

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
    if (fillUserInfo()) {
      try {
        await signInWithEmailAndPassword(auth, email, password).then(
          async (_userCredential) => {
            alert('로그인 성공')
            window.location.replace('/')
          }
        )
      } catch (err: any) {
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
  }

  return (
    <div css={container}>
      <MainHeader windowWidth={width} windowHeight={height} uid={''} />
      <div
        css={[
          signInWrapper,
          {
            padding: `0 ${getSize(30)}px`,
            height: `calc(100vh - ${getSize(60)}px)`,
          },
        ]}
      >
        <div css={{ marginTop: getSize(82) }}>
          <AutoSizeImage
            src="/images/logo@3x.png"
            width={getSize(216)}
            height={getSize(45)}
          />
        </div>

        <div css={inputWrapper}>
          <CSText
            size={13}
            color={'#000'}
            marginTop={30}
            marginBottom={8}
            lineHeight={1.15}
          >
            {'이메일'}
          </CSText>
          <InputText
            name=""
            placeholder="핸드폰 번호로 로그인 해주세요."
            setInputText={setEmail}
            inputText={email}
          />
          {!isEmpty(email) && !emailValidation(email) && (
            <ErrorMessage message={'이메일 형식의 아이디를 입력해주세요.'} />
          )}
          <CSText
            size={13}
            color={'#000'}
            marginTop={30}
            marginBottom={8}
            lineHeight={1.15}
          >
            {'비밀번호'}
          </CSText>
          <InputText
            name=""
            placeholder="비밀번호를 입력해주세요."
            setInputText={setPassword}
            inputText={password}
            passwordType
          />
          {!isEmpty(password) && !passwordValidation(password) && (
            <ErrorMessage
              message={'비밀번호에는 영문과 숫자가 포함 되어야 합니다.'}
            />
          )}
          <div>
            <Button
              onClick={signIn}
              btnHeight={46}
              backgroundColor={fillUserInfo() ? '#000' : '#b9b9b9'}
              fontColor={fillUserInfo() ? '#fff' : '#8b8b8b'}
              fontSize={15}
              borderColor={fillUserInfo() ? '#000' : '#b9b9b9'}
              marginTop={30}
            >
              {'로그인'}
            </Button>
          </div>
        </div>

        <div
          css={{
            width: `calc(100% - ${getSize(60)}px)`,
            position: 'absolute',
            bottom: `${getSize(30)}px`,
          }}
        >
          <Button
            onClick={() => router.push('/signUp')}
            btnHeight={46}
            backgroundColor={'#fff'}
            fontColor={'#000'}
            fontSize={14}
            borderRadius={4}
          >
            회원가입
          </Button>
        </div>
      </div>
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
