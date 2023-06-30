import React, { Dispatch, SetStateAction } from 'react'
import { css } from '@emotion/react'
import { isEmpty } from 'lodash'

type TextAreaProps = {
  name: string
  content?: string
  setContent: Dispatch<SetStateAction<string>>
  placeholder: string
}

const TextArea = ({
  name,
  placeholder,
  content,
  setContent,
}: TextAreaProps) => {
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
  height: 8rem;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 8px;
`

export default TextArea
