// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from 'src/firebase/initFirebase'
import { OrderProps } from 'types/types'

async function getDates(date: number[]) {
  try {
    const ordersInfo: OrderProps[] = []
    const boardRef = collection(db, 'orders')
    const querySnapshot = await getDocs(
      query(boardRef, orderBy('timestamp', 'desc'))
    )

    querySnapshot.forEach((doc) => {
      const dateArray = doc.data().timestamp.split(/[ /:]/).map(Number)
      const [year, month, day] = dateArray.slice(0, 3)

      const isSameDate =
        date[0] === year && date[1] === month && date[2] === day

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
