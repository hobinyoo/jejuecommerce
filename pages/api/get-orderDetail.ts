// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@firebase/initFirebase'
import { OrderProps } from 'types/types'

async function getOrderDetail(id: string) {
  try {
    const ordersInfo: OrderProps[] = []
    const board = collection(db, 'orders')
    const querySnapshot = await getDocs(
      query(board, orderBy('timestamp', 'desc'))
    )
    querySnapshot.forEach((doc) => {
      if (doc.data().uid === id) {
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
  const { id } = req.query

  if (id == null) {
    res.status(400).json({ message: 'Failed' })
  }
  try {
    const myOrderDetail = await getOrderDetail(String(id))
    res.status(200).json({ items: myOrderDetail, message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}
