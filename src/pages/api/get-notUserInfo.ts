// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {
  getDoc,
  doc,
  collection,
  getDocs,
  query,
  orderBy,
  where,
} from 'firebase/firestore'
import { db } from 'src/firebase/initFirebase'

async function getNotUserInfo(name: string, phoneNumber: string) {
  try {
    const board = collection(db, 'orders')
    const querySnapshot = await getDocs(
      query(
        board,
        where('name', '==', name),
        where('phoneNumber', '==', phoneNumber),
        orderBy('timestamp', 'desc')
      )
    )

    querySnapshot.forEach((doc) => console.log(doc.data()))
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
