import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Cart } from '@prisma/client'
import { getSession } from 'next-auth/react'

const prisma = new PrismaClient()

async function addCart(userId: string, item: Omit<Cart, 'id' | 'userId'>) {
  try {
    const response = await prisma.cart.create({
      data: {
        userId,
        ...item,
      },
    })

    console.log(response)

    return response
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
  const { item } = JSON.parse(req.body)
  if (session == null) {
    res.status(200).json({ items: [], message: 'no Session' })
    return
  }

  try {
    const wishlist = await addCart(String(session.user.id), item)
    res.status(200).json({ items: wishlist, message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}
