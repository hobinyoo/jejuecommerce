// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '@firebase/initFirebase'

async function updateCarrierCode(carrierCode: string, orderId: string) {
  try {
    await updateDoc(doc(db, 'orders', orderId), {
      carrierCode: carrierCode,
      prepareShipping: true,
      status: '배송준비',
    })
  } catch (error) {
    console.error(error)
  }
}

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { carrierCode, orderId } = JSON.parse(req.body)
  try {
    await updateCarrierCode(carrierCode, orderId)
    res.status(200).json({ message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}
