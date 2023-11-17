// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore'
import { db } from 'src/firebase/initFirebase'
import { OrderProps } from 'types/types'

async function getNotUserInfo(name: string, phoneNumber: string) {
  try {
    const ordersInfo: OrderProps[] = []
    const board = collection(db, 'orders')
    const querySnapshot = await getDocs(
      query(
        board,
        where('name', '==', name),
        where('phoneNumber', '==', phoneNumber),
        orderBy('timestamp', 'desc')
      )
    )

    if (querySnapshot.empty) {
      return null
    }

    querySnapshot.forEach((doc) => {
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
        carrierRequest: doc.data().carrierRequest,
        method: doc.data().method,
        receipt: doc.data().receipt,
      })
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
  const { name, phoneNumber } = JSON.parse(req.body)

  try {
    const getOne = await getNotUserInfo(name, phoneNumber)
    res.status(200).json({ items: getOne, message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}
