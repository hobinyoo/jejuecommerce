import Header from '@components/Header'
import React, { useEffect, useState } from 'react'
import { DatePicker } from '@mantine/dates'
import { Group } from '@mantine/core'
import { OrderProps } from 'types/types'
import { getDate } from 'function/date'

const Admin = () => {
  const [value, setValue] = useState<Date | null>(new Date())
  const [data, setData] = useState<OrderProps[]>([])
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
  return (
    <div>
      <Header />
      <Group position="center">
        <DatePicker value={value} onChange={(date) => setValue(date)} />
      </Group>
      {data.map((order, index) => {
        const todayDate = getDate(order.timestamp.seconds)
        return <div key={index}>{todayDate}</div>
      })}
    </div>
  )
}

export default Admin
