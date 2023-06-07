const nameValidation = (value: string) => {
  if (2 <= value.length || value.length <= 4) {
    return true
  }
  return false
}
