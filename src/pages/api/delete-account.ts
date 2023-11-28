import type { NextApiRequest, NextApiResponse } from 'next'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from 'src/firebase/initFirebase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query

    await deleteDoc(doc(db, 'users', String(id)))
    res.status(200).json({ message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}
