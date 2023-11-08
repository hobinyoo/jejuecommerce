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
  height: 240px;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 4px;
  border-color: #ececec;
  resize: none;
  font-size: 14px;
  font-family: 'PretendardRegular';
  &:focus {
    outline: none;
  }
`

export default TextArea
