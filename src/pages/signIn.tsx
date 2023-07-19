import React, { useState } from 'react'
import { auth, db } from '../firebase/initFirebase'
import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
  signInWithPhoneNumber,
} from 'firebase/auth'

import Header from '@components/cs/Header'
import Button from '@components/cs/Button'
import { css } from '@emotion/react'
import InputText from '@components/cs/InputText'
import {
  phoneValidation,
  verificationValidation,
} from 'src/function/vaildation'
import ErrorMessage from '@components/Error'
import { isEmpty } from 'lodash'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { UsersProps } from 'types/types'
import { useAppSelector, RootState } from 'src/store'
import MainHeader from '@components/cs/MainHeader'
import AutoSizeImage from '@components/cs/AutoSizeImage'
import { toSize } from 'styles/globalStyle'

const SignIn = () => {
  const router = useRouter()

  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )

  const getSize = (input: number) => {
    return toSize(width, height, input)
  }
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [verificationCode, setVerificationCode] = useState<string>('')
  const [verificationId, setVerificationId] = useState<string>('')
  const [requestCode, setRequestCode] = useState<boolean>(false)

  const sendPhoneNumber = async () => {
    const usersInfo: UsersProps[] = []
    const board = collection(db, 'users')
    const querySnapshot = await getDocs(
      query(board, orderBy('timestamp', 'desc'))
    )
    querySnapshot.forEach((doc: any) => {
      usersInfo.push({
        id: doc.id,
        name: doc.data().name,
        phoneNumber: doc.data().phoneNumber,
      })
    })
    const findUser = usersInfo.find(
      (value) => value.phoneNumber === phoneNumber
    )
    if (findUser) {
      const koreaPhoneNumber = phoneNumber.replace(/^0/, '+82')
      setRequestCode(true)
      const appVerifier = new RecaptchaVerifier(
        'sign-in-button',
        {
          size: 'invisible',
        },
        auth
      )
      signInWithPhoneNumber(auth, koreaPhoneNumber, appVerifier)
        .then((confirmationResult: any) => {
          setVerificationId(confirmationResult.verificationId)
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      alert('회원가입 후 이용해주세요')
      router.push('/signUp')
    }
  }

  const confirmNumber = () => {
    const credential = PhoneAuthProvider.credential(
      verificationId,
      verificationCode
    )

    signInWithCredential(auth, credential)
      .then(async (_userCredential) => {
        // User signed in successfully

        alert('로그인에 성공!')
        router.push('/')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div css={container}>
      <MainHeader windowWidth={width} windowHeight={height} uid={''} />
      <div
        css={[
          signIn,
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
          <InputText
            name="phoneNumber"
            placeholder="핸드폰 번호로 로그인 해주세요."
            setInputText={setPhoneNumber}
            inputText={phoneNumber}
            marginTop={70}
          />
          {!isEmpty(phoneNumber) && !phoneValidation(phoneNumber) && (
            <ErrorMessage message={'올바른 핸드폰 번호를 입력해주세요.'} />
          )}
        </div>

        {requestCode && (
          <div css={inputWrapper}>
            <InputText
              name="verificationCode"
              placeholder="인증 번호"
              setInputText={setVerificationCode}
              inputText={verificationCode}
              marginTop={10}
            />
            {!isEmpty(verificationCode) &&
              !verificationValidation(verificationCode) && (
                <ErrorMessage message={'6자리 번호를 입력해주세요'} />
              )}
          </div>
        )}

        <Button
          id="sign-in-button"
          onClick={requestCode ? confirmNumber : sendPhoneNumber}
          marginTop={10}
          btnHeight={46}
          backgroundColor={'#000'}
          fontColor={'#fff'}
          fontSize={14}
          borderRadius={4}
        >
          {requestCode ? '로그인 하기' : '인증 요청'}
        </Button>

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
const signIn = css`
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
