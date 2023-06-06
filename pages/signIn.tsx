import React, { useState } from 'react'
import { auth } from '../firebase/initFirebase'
import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
  signInWithPhoneNumber,
} from 'firebase/auth'
import Header from '@components/cs/Header'
import Button from '@components/cs/Button'
import Input from '@components/cs/Input'
import { css } from '@emotion/react'

const SignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState('+821050556365')
  const [verificationCode, setVerificationCode] = useState('')
  const [verificationId, setVerificationId] = useState('')

  const sendPhoneNumber = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'sign-in-button',
      {
        size: 'invisible',
      },
      auth
    )

    const appVerifier = window.recaptchaVerifier
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult: any) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult
        console.log(confirmationResult.verificationId)
        setVerificationId(confirmationResult.verificationId)
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
      })
  }

  const confirmNumber = () => {
    const credential = PhoneAuthProvider.credential(
      verificationId,
      verificationCode
    )

    signInWithCredential(auth, credential)
      .then((userCredential) => {
        // User signed in successfully
        console.log(userCredential, 'userCredential')
      })
      .catch((error) => {
        console.error(error)
      })
  }
  return (
    <>
      <Header />
      <div css={signUpContainer}>
        <Input name="phoneNumber" placeholder="핸드폰 번호" />
        <Button id="sign-in-button" onClick={sendPhoneNumber} css={button}>
          인증요청
        </Button>

        <Input
          name="verifyNumber"
          placeholder="인증 번호"
          onChange={(e) => setVerificationCode(e.target.value)}
        />
        <Button onClick={confirmNumber} css={button}>
          확인
        </Button>
      </div>
    </>
  )
}

const signUpContainer = css`
  display: flex;
  flex-direction: column;
`
const button = css`
  margin: 1rem 0;
`
export default SignIn
