// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore'
import { db } from 'src/firebase/initFirebase'

async function getFindUser(name: string, phoneNumber: string) {
  try {
    const board = collection(db, 'users')
    const querySnapshot = await getDocs(
      query(
        board,
        where('name', '==', name),
        where('phoneNumber', '==', phoneNumber)
      )
    )

    querySnapshot.forEach((doc) => {
      if (doc.data()) {
        return false
      } else {
        return true
      }
    })
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
  const { name, phoneNumber } = req.query

  if (name == null || phoneNumber == null) {
    res.status(400).json({ message: 'Failed' })
  }
  try {
    const getUser = await getFindUser(String(name), String(phoneNumber))
    res.status(200).json({ items: getUser, message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}
