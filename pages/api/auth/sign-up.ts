import type { NextApiRequest, NextApiResponse } from 'next'
import { signInWithPhoneNumber } from 'firebase/auth'

async function signUp(phoneNumber: string) {
   
  try {

  } catch (e) {}
}
type Data = {
  items?: any
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { phoneNumber } = JSON.parse(req.body)

  try {
    const products = await signUp(String(phoneNumber))
    res.status(200).json({ items: products, message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}
