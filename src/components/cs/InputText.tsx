import React, { Dispatch, SetStateAction } from 'react'
import { css } from '@emotion/react'
import { isEmpty } from 'lodash'

interface Props {
  name: string
  inputText?: string
  setInputText: Dispatch<SetStateAction<string>>
  placeholder: string
  disabled?: boolean
  marginTop?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
  signUpCertification?: boolean
  passwordType?: boolean
}

const InputText = ({
  name,
  placeholder,
  inputText,
  setInputText,
  disabled = false,
  marginTop,
  signUpCertification,
  passwordType,
}: Props) => {
  return (
    <input
      css={[
        input,
        {
          width: signUpCertification ? '21.4rem' : '100%',
          height: '4.6rem',
          paddingLeft: '2rem',
          borderBottom: `solid 1px ${isEmpty(inputText) ? '#ececec' : '#000'} `,
          borderTop: 'none',
          borderRight: 'none',
          borderLeft: 'none',
          marginTop: marginTop ? `${marginTop}rem` : 0,
        },
      ]}
      type={passwordType ? 'password' : 'text'}
      name={name}
      value={inputText}
      placeholder={placeholder}
      onChange={(e) => setInputText(e.target.value)}
      disabled={disabled}
    />
  )
}

const input = css`
  outline: none;
  font-family: 'PretendardRegular';
  font-size: 1.4rem;
  line-height: 1.14;
  &::placeholder {
    font-size: 1.4rem;
    color: #bebebe;
  }
`

export default InputText
