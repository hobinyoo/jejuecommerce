import CSText from '@components/cs/CSText'
import { css } from '@emotion/react'
import Link from 'next/link'
import React from 'react'

const SellerInfoSection = () => {
  const list = [
    { title: '상호', content: '달인의 가마솥' },
    { title: '매장주소', content: '제주시 달마루길 20-7' },
    { title: '대표전화', content: '064-711-6465' },
    { title: '팩스번호', content: '064-711-6468' },
    { title: '사업자등록 번호', content: '258-05-02641' },
    { title: '통신판매업등록 번호', content: '000-0000-000000' },
    { title: '즉석판매제조가공업\n등록번호', content: '제주2023-0907754' },
  ]
  return (
    <div
      css={[
        container,
        {
          padding: '2.9rem 2rem 0 2rem',
        },
      ]}
    >
      <CSText
        size={1.6}
        fontFamily={'PretendardBold'}
        color={'#3e3737'}
        lineHeight={1.25}
      >
        {'판매자정보'}
      </CSText>
      <table css={[table, { marginTop: '2.1rem' }]}>
        <tbody>
          {list.map(({ title, content }, index) => (
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
                  {title}
                </CSText>
              </td>
              <td
                css={{
                  padding: '1.5rem',
                }}
              >
                <CSText size={1.3} lineHeight={1.54}>
                  {content}
                </CSText>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        css={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '0.5rem',
          textDecoration: 'underline',
          marginTop: '3rem',
          paddingBottom: '1rem',
        }}
      >
        <Link href="/service">
          <CSText size={1.3} lineHeight={1.54} color="#11264f">
            서비스 이용약관
          </CSText>
        </Link>
        <Link href="/agree_mathod">
          <CSText size={1.3} lineHeight={1.54} color="#11264f">
            개인정보 처리방침
          </CSText>
        </Link>
      </div>
    </div>
  )
}

const container = css`
  width: 100%;
  background-color: #f3f3f3;
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
export default SellerInfoSection
