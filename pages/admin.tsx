import Header from '@components/Header'
import React, { useEffect, useState } from 'react'
import { DatePicker } from '@mantine/dates'
import { Group } from '@mantine/core'
import { OrderProps } from 'types/types'
import { getDate } from 'function/date'
import InputText from '@components/InputText'
import Button from '@components/Button'

const Admin = () => {
  const [value, setValue] = useState<Date | null>(new Date())
  const [data, setData] = useState<OrderProps[]>([])
  const [carrierCode, setCarrierCode] = useState<string>('')

  const todayTotalPrice = data
    .map((item) => Number(item.totalPrice))
    .reduce((prev, curr) => prev + curr, 0)

  useEffect(() => {
    fetch(`/api/beef/get-dates`, {
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
    fetch(`/api/beef/update-carrierCode`, {
      method: 'POST',
      body: JSON.stringify({
        carrierCode: carrierCode,
        orderId: orderId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Success') {
          fetch(`/api/beef/get-dates`, {
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
    <div>
      <Header />
      <Group position="right" css={{ marginBottom: '1rem' }}>
        <DatePicker value={value} onChange={(date) => setValue(date)} />
      </Group>
      {data &&
        data.map((value, index) => {
          const todayDate = getDate(value.timestamp.seconds)

          return (
            <div
              key={index}
              css={{
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid black',
                padding: '1rem',
                marginBottom: '1rem',
              }}
            >
              <div>메뉴: {value.menu}</div>
              <div>수량: {value.quantity}</div>
              <div>가격: {value.totalPrice}</div>
              <div>받는사람: {value.name}</div>
              <div>핸드폰 번호: {value.phoneNumber}</div>
              <div>주소: {value.address}</div>
              <div>상세주소: {value.addressDetail}</div>
              <div>우편번호: {value.postCode}</div>
              <div>주문날짜: {todayDate}</div>
              <div>배송코드:</div>
              <div
                css={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                }}
              >
                <InputText
                  name="carrerCode"
                  placeholder="배송 송장"
                  setInputText={setCarrierCode}
                  inputText={value.carrierCode ?? ''}
                  disabled={value.prepareShipping}
                />
                {!value.prepareShipping && (
                  <Button onClick={() => prepareShipping(value.id)}>
                    배송준비완료
                  </Button>
                )}
              </div>
            </div>
          )
        })}
      <div>총 매출: {todayTotalPrice}</div>
    </div>
  )
}

export default Admin
