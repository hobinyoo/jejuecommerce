import React, { useState } from 'react'
import { auth, db } from '../firebase/initFirebase'
import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
  signInWithPhoneNumber,
} from 'firebase/auth'
import Button from '@components/cs/Button'
import { css } from '@emotion/react'
import InputText from '@components/cs/InputText'
import {
  nameValidation,
  phoneValidation,
  verificationValidation,
} from 'src/function/vaildation'
import ErrorMessage from '@components/Error'
import { isEmpty } from 'lodash'
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore'
import { useRouter } from 'next/router'
import { UsersProps } from 'types/types'
import { useAppSelector, RootState } from 'src/store'
import { toSize } from 'styles/globalStyle'
import MainHeader from '@components/cs/MainHeader'
import CSText from '@components/cs/CSText'
import SignUpModal from '@components/modal/SignUpModal'

const SignUp = () => {
  const router = useRouter()

  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )

  const getSize = (input: number) => {
    return toSize(width, height, input)
  }
  const [name, setName] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [verificationCode, setVerificationCode] = useState<string>('')
  const [verificationId, setVerificationId] = useState<string>('')

  const [requestCode, setRequestCode] = useState<boolean>(false)
  const [modalVisible, setModalVisible] = useState<boolean>(false)

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
        setModalVisible(true)
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
          signUp,
          {
            padding: `0 ${getSize(20)}px`,
          },
        ]}
      >
        <CSText
          size={13}
          fontFamily={'PretendardRegular'}
          color={'#000'}
          marginTop={30}
          marginBottom={8}
          lineHeight={1.15}
        >
          {'이름'}
        </CSText>
        <InputText
          name="name"
          placeholder="이름을 입력해주세요."
          setInputText={setName}
          inputText={name}
        />
        {!isEmpty(name) && !nameValidation(name) && (
          <ErrorMessage message={'2-4 글자의 이름을 입력해주세요.'} />
        )}
        <CSText
          size={13}
          fontFamily={'PretendardRegular'}
          color={'#000'}
          marginTop={30}
          marginBottom={8}
          lineHeight={1.15}
        >
          {'핸드폰 번호'}
        </CSText>
        <div css={phone}>
          <InputText
            name="phoneNumber"
            placeholder="핸드폰 번호를 입력해주세요."
            setInputText={setPhoneNumber}
            inputText={phoneNumber}
            signUpCertification
          />

          <Button
            id="sign-in-button"
            onClick={sendPhoneNumber}
            btnWidth={100}
            btnHeight={46}
            backgroundColor={'#fff'}
            fontColor={'#000'}
            fontSize={14}
            borderRadius={4}
          >
            인증요청
          </Button>
        </div>
        {!isEmpty(phoneNumber) && !phoneValidation(phoneNumber) && (
          <ErrorMessage message={'올바른 번호를 입력해주세요'} />
        )}

        {/* 인증번호 */}
        {requestCode && (
          <>
            <CSText
              size={13}
              fontFamily={'PretendardRegular'}
              color={'#000'}
              marginTop={10}
              marginBottom={8}
              lineHeight={1.15}
            >
              {'인증번호'}
            </CSText>
            <InputText
              name="verificationCode"
              placeholder="인증 번호"
              setInputText={setVerificationCode}
            />
            {!isEmpty(verificationCode) &&
              !verificationValidation(verificationCode) && (
                <ErrorMessage message={'6자리 번호를 입력해주세요'} />
              )}
          </>
        )}
      </div>
      <div css={button}>
        <Button
          onClick={confirmNumber}
          btnHeight={46}
          backgroundColor={
            verificationValidation(verificationCode) ? '#000' : '#b9b9b9'
          }
          fontColor={
            verificationValidation(verificationCode) ? '#fff' : '#8b8b8b'
          }
          fontSize={15}
          borderColor={
            verificationValidation(verificationCode) ? '#000' : '#b9b9b9'
          }
        >
          {'회원가입'}
        </Button>
      </div>

      {modalVisible && <SignUpModal setSignVisible={setModalVisible} />}
    </div>
  )
}
const container = css`
  width: 100%;
`

const signUp = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`

const phone = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const button = css`
  position: absolute;
  width: 100%;
  bottom: 0;
`
export default SignUp
