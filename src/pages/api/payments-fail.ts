import { NextApiRequest, NextApiResponse } from 'next'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from 'src/firebase/initFirebase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { orderId } = req.query
  await deleteDoc(doc(db, 'orders', String(orderId)))

  //TODO: DB 처리
  res.redirect(`/paymentsFail`)
}
