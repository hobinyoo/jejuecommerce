import React, { Dispatch, SetStateAction } from 'react'
import { css } from '@emotion/react'

interface Props {
  name: string
  inputText?: string
  setInputText: Dispatch<SetStateAction<string>>
  placeholder: string
  disabled?: boolean
}

const InputText = ({
  name,
  placeholder,
  inputText,
  setInputText,
  disabled = false,
}: Props) => {
  return (
    <input
      css={input}
      name={name}
      value={inputText}
      placeholder={placeholder}
      onChange={(e) => setInputText(e.target.value)}
      disabled={disabled}
    />
  )
}

const input = css`
  padding: 8px;
  border-radius: 8px;
`

export default InputText
