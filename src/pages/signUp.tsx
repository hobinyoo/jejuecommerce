import React, { useState } from 'react'
import { auth, db } from '../firebase/initFirebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import Button from '@components/cs/Button'
import { css } from '@emotion/react'
import InputText from '@components/cs/InputText'
import {
  emailValidation,
  nameValidation,
  passwordValidation,
  phoneValidation,
} from 'src/function/vaildation'
import ErrorMessage from '@components/Error'
import { isEmpty } from 'lodash'
import { doc, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useAppSelector, RootState } from 'src/store'
import { toSize } from 'styles/globalStyle'
import MainHeader from '@components/cs/MainHeader'
import CSText from '@components/cs/CSText'
import SignUpModal from '@components/modal/SignUpModal'

import PostModal from '@components/modal/PostModal'

const SignUp = () => {
  const router = useRouter()

  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )

  const getSize = (input: number) => {
    return toSize(width, height, input)
  }

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordCheck, setPasswordCheck] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [addressDetail, setAddressDetail] = useState<string>('')
  const [postCode, setPostCode] = useState<string>('')

  const [postVisible, setPostVisible] = useState<boolean>(false)
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const handle = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setPostVisible(true)
    },

    // 주소 선택 이벤트
    selectAddress: (data: any) => {
      setAddress(data.address)
      setPostCode(data.zonecode)
      setPostVisible(false)
    },
  }

  const fillUserInfo = () => {
    if (
      !isEmpty(email) &&
      !isEmpty(password) &&
      !isEmpty(passwordCheck) &&
      !isEmpty(name) &&
      !isEmpty(phoneNumber) &&
      !isEmpty(postCode) &&
      !isEmpty(address) &&
      !isEmpty(addressDetail) &&
      emailValidation(email) &&
      passwordValidation(password) &&
      nameValidation(name) &&
      phoneValidation(phoneNumber) &&
      password === passwordCheck
    ) {
      return true
    } else {
      return false
    }
  }

  const signUp = async () => {
    if (fillUserInfo()) {
      try {
        await createUserWithEmailAndPassword(auth, email, password).then(
          async (userCredential) => {
            // User signed in successfully
            const userUid = userCredential.user.uid
            await setDoc(doc(db, 'users', userUid), {
              email: email,
              name: name,
              postCode: postCode,
              address: address,
              addressDetail: addressDetail,
              phoneNumber: phoneNumber,
              timestamp: new Date(),
            })
            setModalVisible(true)
          }
        )
      } catch (err: any) {
        switch (err.code) {
          case 'auth/weak-password':
            alert('비밀번호는 6자리 이상이어야 합니다')
            break
          case 'auth/invalid-email':
            alert('잘못된 이메일 주소입니다')
            break
          case 'auth/email-already-in-use':
            alert('이미 가입되어 있는 계정입니다')
            router.push('/signIn')
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
          signUpWrapper,
          {
            padding: `${getSize(30)}px ${getSize(20)}px`,
          },
        ]}
      >
        <CSText size={13} color="#000" marginBottom={8} lineHeight={1.15}>
          {'이메일'}
        </CSText>
        <InputText
          name="email"
          placeholder="이메일을 입력해주세요."
          setInputText={setEmail}
          inputText={email}
        />
        {!isEmpty(email) && !emailValidation(email) && (
          <ErrorMessage message={'이메일 형식의 아이디를 입력해주세요.'} />
        )}
        <CSText
          size={13}
          color="#000"
          marginTop={30}
          marginBottom={8}
          lineHeight={1.15}
        >
          {'비밀번호'}
        </CSText>
        <InputText
          name="password"
          placeholder="6자리 이상의 비밀번호를 입력해주세요."
          passwordType
          setInputText={setPassword}
          inputText={password}
        />
        {!isEmpty(password) && !passwordValidation(password) && (
          <ErrorMessage
            message={'비밀번호에는 영문과 숫자가 포함 되어야 합니다.'}
          />
        )}
        <CSText
          size={13}
          color="#000"
          marginTop={30}
          marginBottom={8}
          lineHeight={1.15}
        >
          {'비밀번호 확인'}
        </CSText>
        <InputText
          name="password"
          placeholder="다시 한번 비밀번호를 입력해주세요."
          passwordType
          setInputText={setPasswordCheck}
          inputText={passwordCheck}
        />
        {!isEmpty(passwordCheck) && password !== passwordCheck && (
          <ErrorMessage message={'비밀번호가 같지 않습니다.'} />
        )}
        <CSText
          size={13}
          color="#000"
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
          color="#000"
          marginTop={30}
          marginBottom={8}
          lineHeight={1.15}
        >
          {'휴대폰 번호'}
        </CSText>
        <div>
          <InputText
            name="phoneNumber"
            placeholder="휴대폰 번호를 입력해주세요."
            setInputText={setPhoneNumber}
            inputText={phoneNumber}
          />
        </div>
        {!isEmpty(phoneNumber) && !phoneValidation(phoneNumber) && (
          <ErrorMessage message={'올바른 번호를 입력해주세요'} />
        )}
        <CSText
          size={13}
          color="#000"
          marginTop={30}
          marginBottom={8}
          lineHeight={1.15}
        >
          {'주소'}
        </CSText>
        <div css={findAddress}>
          <InputText
            name="postCode"
            placeholder="우편 번호"
            setInputText={setPostCode}
            inputText={postCode}
            signUpCertification
          />

          <Button
            onClick={handle.clickButton}
            btnWidth={100}
            btnHeight={46}
            backgroundColor="#fff"
            fontColor="#15c9de"
            fontSize={14}
            borderRadius={4}
            borderColor="#15c9de"
          >
            주소 찾기
          </Button>
        </div>
        <InputText
          name="address"
          placeholder="주소 입력"
          setInputText={setAddress}
          inputText={address}
          marginTop={10}
        />
        <InputText
          name="addressDetail"
          placeholder="상세 주소"
          setInputText={setAddressDetail}
          inputText={addressDetail}
          marginTop={10}
        />
        <Button
          onClick={signUp}
          btnHeight={46}
          backgroundColor="#15c9de"
          fontColor="#fff"
          fontSize={15}
          borderColor="#15c9de"
          marginTop={30}
          borderRadius={8}
        >
          회원가입
        </Button>
      </div>

      {postVisible && (
        <PostModal
          setPostVisible={setPostVisible}
          setAddress={setAddress}
          setPostCode={setPostCode}
        />
      )}

      {modalVisible && <SignUpModal setSignVisible={setModalVisible} />}
    </div>
  )
}
const container = css`
  width: 100%;
`

const signUpWrapper = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`

const findAddress = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
export default SignUp
