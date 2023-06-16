// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore'
import { db } from '@firebase/initFirebase'
import { OrderProps } from 'types/types'
import { compareTimestamps } from 'function/date'

async function getDates(date: number) {
  try {
    const ordersInfo: OrderProps[] = []
    const boardRef = collection(db, 'orders')
    const querySnapshot = await getDocs(
      query(boardRef, orderBy('timestamp', 'desc'))
    )

    querySnapshot.forEach((doc) => {
      const isSameDate = compareTimestamps(
        doc.data().timestamp.seconds * 1000,
        date
      )

      if (isSameDate) {
        ordersInfo.push({
          address: doc.data().address,
          addressDetail: doc.data().addressDetail,
          menu: doc.data().menu,
          name: doc.data().name,
          phoneNumber: doc.data().phoneNumber,
          postCode: doc.data().postCode,
          quantity: doc.data().quantity,
          status: doc.data().status,
          timestamp: doc.data().timestamp,
          totalPrice: doc.data().totalPrice,
          prepareShipping: doc.data().prepareShipping,
          carrierCode: doc.data().carrierCode,
          uid: doc.data().uid,
          id: doc.id,
        })
      }
    })

    return ordersInfo
  } catch (error) {
    console.error(error)
  }
}

type Data = {
  items?: any
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { date } = JSON.parse(req.body)
  try {
    const getDateOrderInfo = await getDates(date)
    res.status(200).json({ items: getDateOrderInfo, message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}
