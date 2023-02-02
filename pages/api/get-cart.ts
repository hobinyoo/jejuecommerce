import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getSession } from 'next-auth/react'

const prisma = new PrismaClient()

async function getCart(userId: string) {
  try {
    const cart = await prisma.$queryRaw`
    SELECT c.id, userId, quantity, amount, price, name, image_url, productId FROM Cart as c JOIN products as p WHERE c.productId=p.id AND c.userId=${userId};`

    return cart
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
  const session = await getSession({ req })
  if (session == null) {
    res.status(200).json({ items: [], message: 'no Session' })
    return
  }

  try {
    const wishlist = await getCart(String(session.user.id))
    res.status(200).json({ items: wishlist, message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}
