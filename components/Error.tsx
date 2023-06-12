import { css } from '@emotion/react'
import React from 'react'

type Props = {
  name?: boolean
  phone?: boolean
}
export const ErrorMessage = ({ name = false, phone = false }: Props) => {
  return (
    <div css={{ fontSize: '0.9rem', color: 'red' }}>
      {name
        ? '2-4 글자의 이름을 입력해주세요.'
        : phone
        ? '올바른 번호를 입력해주세요'
        : '6자리 번호를 입력해주세요'}
    </div>
  )
}

export default ErrorMessage
