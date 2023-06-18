import React, { useState } from 'react'
import { auth, db } from '../firebase/initFirebase'
import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
  signInWithPhoneNumber,
} from 'firebase/auth'
import Header from '@components/Header'
import Button from '@components/Button'
import { css } from '@emotion/react'
import InputText from '@components/InputText'
import { phoneValidation, verificationValidation } from 'function/vaildation'
import ErrorMessage from '@components/Error'
import { isEmpty } from 'lodash'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { UsersProps } from 'types/types'

const SignIn = () => {
  const router = useRouter()

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

    for (const user of usersInfo) {
      if (user.phoneNumber === phoneNumber) {
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
  }

  const confirmNumber = () => {
    const credential = PhoneAuthProvider.credential(
      verificationId,
      verificationCode
    )

    signInWithCredential(auth, credential)
      .then(() => {
        // User signed in successfully
        alert('로그인에 성공!')
        router.push('/')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <>
      <Header />
      <div css={signInContainer}>
        {/* 핸드폰 번호 */}
        핸드폰 번호:
        <InputText
          name="phoneNumber"
          placeholder="핸드폰 번호"
          setInputText={setPhoneNumber}
        />
        {!isEmpty(phoneNumber) && !phoneValidation(phoneNumber) && (
          <ErrorMessage message={'올바른 번호를 입력해주세요'} />
        )}
        <Button id="sign-in-button" onClick={sendPhoneNumber} css={button}>
          인증요청
        </Button>
        <br />
        {/* 인증번호 */}
        {requestCode && (
          <>
            인증번호:
            <InputText
              name="verificationCode"
              placeholder="인증 번호"
              setInputText={setVerificationCode}
            />
            {!isEmpty(verificationCode) &&
              !verificationValidation(verificationCode) && (
                <ErrorMessage message={'6자리 번호를 입력해주세요'} />
              )}
            <Button onClick={confirmNumber} css={button}>
              확인
            </Button>
          </>
        )}
      </div>
    </>
  )
}

const signInContainer = css`
  display: flex;
  flex-direction: column;
`
const button = css`
  margin: 1rem 0;
`
export default SignIn
