import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import firebase, { auth } from '../firebase/initFirebase'
import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
  signInWithPhoneNumber,
} from 'firebase/auth'

const SignUp = () => {
  const [phoneNumber, setPhoneNumber] = useState('+821050556365')
  const [verificationCode, setVerificationCode] = useState('')
  const [verificationId, setVerificationId] = useState('')
  console.log(verificationId)
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
        window.confirmationResult = confirmationResult;
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
    console.log(verificationId,verificationCode)
    const credential = PhoneAuthProvider.credential(
      verificationId,
      verificationCode
    )

    signInWithCredential(auth, credential)
      .then((userCredential) => {
        // User signed in successfully
        console.log(userCredential,'userCredential')
      })
      .catch((error) => {
        console.error(error)
      })
  }
  return (
    <SignInContainer>
      <div>회원가입</div>
      <input name="name" placeholder="이름" />
      <button id="sign-in-button" onClick={sendPhoneNumber}>
        인증요청
      </button>
      <input name="phoneNumber" placeholder="핸드폰 번호" />
      <input
        name="phoneNumber"
        placeholder="인증 번호"
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <button onClick={confirmNumber}>확인</button>
    </SignInContainer>
  )
}

export default SignUp

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
`
