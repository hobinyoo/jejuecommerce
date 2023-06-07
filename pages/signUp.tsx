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
import { css } from '@emotion/react'
import InputText from '@components/cs/InputText'

const SignUp = () => {
  const [name, setName] = useState<string>('')
  const [validName, seteValidName] = useState<boolean>(false)
  const [phoneNumber, setPhoneNumber] = useState<string>('+821050556365')
  const [verificationCode, setVerificationCode] = useState<string>('')
  const [verificationId, setVerificationId] = useState<string>('')

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
        <InputText name="name" placeholder="이름" setInputText={setName} />
        {/* <InputText name="phoneNumber" placeholder="핸드폰 번호" setInputText={setPhoneNumber} />
        <Button id="sign-in-button" onClick={sendPhoneNumber} css={button}>
          인증요청
        </Button>

        <InputText
          name="verifyNumber"
          placeholder="인증 번호"
          setInputText={setVerificationCode}
        />
        <Button onClick={confirmNumber} css={button}>
          확인
        </Button> */}
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
export default SignUp
