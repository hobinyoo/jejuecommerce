import CSSpan from '@components/cs/CSSpan'
import CSText from '@components/cs/CSText'
import { css } from '@emotion/react'
import React from 'react'

const NotationsSection = () => {
  const list = [
    '한우소고기',
    '고추가루',
    '우거지',
    '무',
    '양파',
    '대파',
    '사골',
  ]
  return (
    <div css={container}>
      <CSText
        size={1.6}
        fontFamily={'PretendardBold'}
        color={'#3e3737'}
        lineHeight={1.25}
      >
        제품표기사항
        <CSSpan size={1.6} color={'#3e3737'} lineHeight={1.25}>
          (식재료원산지)
        </CSSpan>
      </CSText>
      <table css={[table, { marginTop: '2.1rem' }]}>
        <tbody>
          {list.map((value, index) => (
            <tr key={index}>
              <td
                css={{
                  width: '14rem',
                  padding: '1.5rem',
                }}
              >
                <CSText
                  size={1.3}
                  fontFamily={'PretendardBold'}
                  color={'#3e3737'}
                  lineHeight={1.54}
                >
                  {value}
                </CSText>
              </td>
              <td
                css={{
                  padding: '1.5rem',
                }}
              >
                <CSText size={1.3} lineHeight={1.54}>
                  국내산
                </CSText>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const container = css`
  width: 100%;
  background-color: #f3f3f3;
  padding: 2.9rem 2rem 0 2rem;
`

const table = css`
  width: 100%;
  border-collapse: collapse;

  td {
    border-right: none;
    border-bottom: 1px solid #f3f3f3;
    background-color: #fff;
  }

  tr:first-of-type td {
    border-top: 1px solid #fff;
  }

  tr td:last-of-type {
    border-right: none;
    background-color: #fff;
  }
`
export default NotationsSection
