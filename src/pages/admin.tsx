import React, { useEffect, useState } from 'react'
import { DatePicker } from '@mantine/dates'
import { Group } from '@mantine/core'
import { OrderProps } from 'types/types'
import InputText from '@components/cs/InputText'
import Button from '@components/cs/Button'
import CSText from '@components/cs/CSText'
import CSSpan from '@components/cs/CSSpan'
import OrderMenu from '@components/order-menu/OrderMenu'
import Link from 'next/link'

import { css } from '@emotion/react'
import MainHeader from '@components/cs/MainHeader'

const Admin = () => {
  const [value, setValue] = useState<Date | null>(new Date())
  const [data, setData] = useState<OrderProps[]>([])
  const [carrierCode, setCarrierCode] = useState<string>('')
  console.log(data, '날짜찍어봐라')
  useEffect(() => {
    fetch(`/api/get-dates`, {
      method: 'POST',
      body: JSON.stringify({
        date: value?.getTime(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.items)
      })
      .catch((error) => console.error(error))
  }, [value])

  const prepareShipping = (orderId: string) => {
    fetch(`/api/update-carrierCode`, {
      method: 'POST',
      body: JSON.stringify({
        carrierCode: carrierCode,
        orderId: orderId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Success') {
          fetch(`/api/get-dates`, {
            method: 'POST',
            body: JSON.stringify({
              date: value?.getTime(),
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              setData(data.items)
            })
            .catch((error) => console.error(error))
        }
      })
      .catch((error) => console.error(error))
  }

  return (
    <>
      <MainHeader uid={''} />
      <div css={{ padding: '0 2rem' }}>
        <Group position="right" css={{ marginBottom: '1rem' }}>
          <DatePicker value={value} onChange={(date) => setValue(date)} />
        </Group>

        {data &&
          data.map((value, index) => {
            return (
              <div key={index}>
                <CSText
                  size={1.3}
                  color="#8b8b8b"
                  lineHeight={1.15}
                  marginTop={4}
                  marginBottom={0.5}
                >
                  주문일:
                  <CSSpan size={1.3} color="#8b8b8b" lineHeight={1.15}>
                    {value.timestamp}
                  </CSSpan>
                </CSText>
                <OrderMenu quantityArr={value.quantity} />
                <div
                  css={{
                    marginTop: '2rem',
                    marginBottom: '2rem',
                  }}
                >
                  <CSText
                    size={1.5}
                    fontFamily={'PretendardBold'}
                    lineHeight={1.2}
                    marginTop={4}
                  >
                    받는사람
                  </CSText>
                  <div css={[carrierInfo, { marginTop: '2rem' }]}>
                    <div css={{ width: '9rem' }}>
                      <CSText size={1.5} color="#8b8b8b" lineHeight={1.2}>
                        받는 사람
                      </CSText>
                    </div>

                    <CSText size={1.5} lineHeight={1.2} marginLeft={3.1}>
                      {value.name}
                    </CSText>
                  </div>
                  <div css={[carrierInfo, { marginTop: '2rem' }]}>
                    <div css={{ width: '9rem' }}>
                      <CSText size={1.5} color="#8b8b8b" lineHeight={1.2}>
                        핸드폰 번호
                      </CSText>
                    </div>
                    <CSText size={1.5} lineHeight={1.2} marginLeft={3.1}>
                      {value.phoneNumber}
                    </CSText>
                  </div>
                  <div css={[carrierInfo, { marginTop: '2rem' }]}>
                    <div css={{ width: '9rem' }}>
                      <CSText size={1.5} color="#8b8b8b" lineHeight={1.2}>
                        주소
                      </CSText>
                    </div>
                    <div
                      css={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginLeft: '3.1rem',
                      }}
                    >
                      <CSText size={1.5} lineHeight={1.2}>
                        {value.address}
                      </CSText>
                      <CSText size={1.5} lineHeight={1.2}>
                        {value.addressDetail}
                      </CSText>
                    </div>
                  </div>
                  <div css={[carrierInfo, { marginTop: '2rem' }]}>
                    <div css={{ width: '9rem' }}>
                      <CSText size={1.5} color="#8b8b8b" lineHeight={1.2}>
                        우편 번호
                      </CSText>
                    </div>
                    <CSText size={1.5} lineHeight={1.2} marginLeft={3.1}>
                      {value.postCode}
                    </CSText>
                  </div>
                  <div css={[carrierInfo, { marginTop: '2rem' }]}>
                    <div css={{ width: '9rem' }}>
                      <CSText size={1.5} color="#8b8b8b" lineHeight={1.2}>
                        배송 요청사항
                      </CSText>
                    </div>
                    <CSText size={1.5} lineHeight={1.2} marginLeft={3.1}>
                      {value.carrierRequest}
                    </CSText>
                  </div>
                  <div css={[carrierInfo, { marginTop: '2rem' }]}>
                    <div css={{ width: '9rem' }}>
                      <CSText size={1.5} color="#8b8b8b" lineHeight={1.2}>
                        배송현황
                      </CSText>
                    </div>
                    <CSText size={1.5} lineHeight={1.2} marginLeft={3.1}>
                      {value.status === 'DONE' ? '상품준비' : value.status}
                    </CSText>
                  </div>
                  <div css={[carrierInfo, { marginTop: '2rem' }]}>
                    <div css={{ width: '9rem' }}>
                      <CSText size={1.5} color="#8b8b8b" lineHeight={1.2}>
                        영수증
                      </CSText>
                    </div>
                    {value.receipt && (
                      <Link href={value.receipt}>
                        <CSText
                          size={1.5}
                          color="blue"
                          lineHeight={1.2}
                          marginLeft={3.1}
                          textDecoration="underline"
                        >
                          영수증
                        </CSText>
                      </Link>
                    )}
                  </div>
                  <div
                    css={{
                      display: 'flex',
                      gap: '30px',
                      width: '100%',
                      justifyContent: 'space-between',
                      marginTop: '20px',
                    }}
                  >
                    <InputText
                      name="carrerCode"
                      placeholder="배송 송장"
                      setInputText={setCarrierCode}
                      inputText={value.carrierCode ?? carrierCode}
                      disabled={value.prepareShipping}
                    />
                    {!value.prepareShipping && (
                      <Button
                        btnWidth={12.5}
                        btnHeight={4.6}
                        backgroundColor="#15c9de"
                        borderColor="#15c9de"
                        fontColor="#fff"
                        fontSize={1.3}
                        borderRadius={0.4}
                        onClick={() => prepareShipping(value.id)}
                      >
                        배송준비완료
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </>
  )
}

const carrierInfo = css`
  display: flex;
`

export default Admin
