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
