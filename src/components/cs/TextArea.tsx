import React, { Dispatch, SetStateAction } from 'react'
import { css } from '@emotion/react'
import { isEmpty } from 'lodash'

interface Props {
  name: string
  content?: string
  setContent: Dispatch<SetStateAction<string>>
  placeholder: string
}

const TextArea = ({ name, placeholder, content, setContent }: Props) => {
  return (
    <textarea
      css={textarea}
      name={name}
      value={isEmpty(content) ? undefined : content}
      placeholder={placeholder}
      onChange={(e) => setContent(e.target.value)}
    />
  )
}

const textarea = css`
  width: 100%;
  height: 24rem;
  padding: 1.5rem;
  box-sizing: border-box;
  border-radius: 0.4rem;
  border-color: #ececec;
  resize: none;
  font-size: 1.4rem;
  font-family: 'PretendardRegular';
  &:focus {
    outline: none;
  }
`

export default TextArea
