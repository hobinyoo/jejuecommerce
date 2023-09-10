export const nameValidation = (value: string) => {
  if (2 <= value.length && value.length <= 4) {
    return true
  }
  return false
}

export const phoneValidation = (value: string) => {
  const pattern = /^[0-9]{10,11}$/
  return pattern.test(value)
}

export const verificationValidation = (value: string) => {
  if (value.length === 6) {
    return true
  }
  return false
}

export const emailValidation = (value: string) => {
  // 이메일 주소를 검사하기 위한 정규 표현식
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

  // 입력된 이메일 주소가 정규 표현식과 일치하는지 확인
  return emailRegex.test(value)
}

export const passwordValidation = (value: string) => {
  // 적어도 하나의 영어 문자와 하나의 숫자를 포함하는지를 확인하는 정규 표현식
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/

  // 입력된 비밀번호가 정규 표현식과 일치하는지 확인
  return passwordRegex.test(value)
}
