import React, { useRef, useState } from 'react'
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
  nameValidation,
  phoneValidation,
  verificationValidation,
} from 'function/vaildation'
import ErrorMessage from '@components/cs/Error'
import { isEmpty } from 'lodash'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'

const SignUp = () => {
  const [name, setName] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [verificationCode, setVerificationCode] = useState<string>('')
  const [verificationId, setVerificationId] = useState<string>('')
  const [requestCode, setRequestCode] = useState<boolean>(false)

  const sendPhoneNumber = () => {
    //TODO: users의 id안에 있는 모든 phoneNumber를 조회하여 대조한다 이미 있는 번호라면 알려주기
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
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        setVerificationId(confirmationResult.verificationId)
        // ...
      })
      .catch((error) => {
        console.log(error)
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
      .then(async (userCredential) => {
        // User signed in successfully
        const userUid = userCredential.user.uid
        await setDoc(doc(db, 'users', userUid), {
          name: name,
          phoneNumber: phoneNumber,
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  // todo: https://firebase.google.com/docs/auth/admin/verify-id-tokens?hl=ko#web 에서 토큰 관리

  return (
    <>
      <Header />
      <div css={signUpContainer}>
        {/* 이름 */}
        이름:
        <InputText name="name" placeholder="이름" setInputText={setName} />
        {!isEmpty(name) && !nameValidation(name) && <ErrorMessage name />}
        <br />
        {/* 핸드폰 번호 */}
        핸드폰 번호:
        <InputText
          name="phoneNumber"
          placeholder="핸드폰 번호"
          setInputText={setPhoneNumber}
        />
        {!isEmpty(phoneNumber) && !phoneValidation(phoneNumber) && (
          <ErrorMessage phone />
        )}
        <Button id="sign-in-button" onClick={sendPhoneNumber} css={button}>
          인증요청
        </Button>
        <br />
        {/* 인증번호 */}
        <>
          인증번호:
          <InputText
            name="verificationCode"
            placeholder="인증 번호"
            setInputText={setVerificationCode}
          />
          {!isEmpty(verificationCode) &&
            !verificationValidation(verificationCode) && <ErrorMessage />}
          <Button onClick={confirmNumber} css={button}>
            확인
          </Button>
        </>
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
