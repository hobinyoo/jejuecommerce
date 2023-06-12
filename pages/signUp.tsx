import React, { useRef, useState } from 'react'
import { auth, db } from '../firebase/initFirebase'
import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
  signInWithPhoneNumber,
  signOut,
} from 'firebase/auth'
import Header from '@components/Header'
import Button from '@components/Button'
import { css } from '@emotion/react'
import InputText from '@components/InputText'
import {
  nameValidation,
  phoneValidation,
  verificationValidation,
} from 'function/vaildation'
import ErrorMessage from '@components/Error'
import { isEmpty } from 'lodash'
import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore'
import { useRouter } from 'next/router'
import { UsersProps } from 'types/types'

const SignUp = () => {
  const router = useRouter()

  const [name, setName] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [verificationCode, setVerificationCode] = useState<string>('')
  const [verificationId, setVerificationId] = useState<string>('')
  const [requestCode, setRequestCode] = useState<boolean>(false)

  // const user = auth.currentUser

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
        alert('이미 존재하는 번호입니다.')
        router.push('/signIn')
        //TODO: 로그인 화면으로 이동 로직
      } else {
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
      }
    }
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
          timestamp: new Date(),
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
        {requestCode && (
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
        )}
        {/* <button onClick={() => signOut(auth)}>로그아웃</button> */}
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
