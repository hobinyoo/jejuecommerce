// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getDoc, doc } from 'firebase/firestore'
import { db } from 'src/firebase/initFirebase'

async function getOneUserinfo(id: string) {
  try {
    const docRef = doc(db, 'users', id)
    const result = await getDoc(docRef)
    return result.data()
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
    const getOne = await getOneUserinfo(String(id))
    res.status(200).json({ items: getOne, message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}
