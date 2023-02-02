import { authOption } from './auth/[...nextauth]'
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Cart } from '@prisma/client'
import { getSession } from 'next-auth/react'

const prisma = new PrismaClient()

async function deleteCart(id: number) {
  try {
    const response = await prisma.cart.delete({
      where: {
        id: id,
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
  const { id } = JSON.parse(req.body)
  if (session == null) {
    res
      .status(200)
      .json({ items: [], message: 'no Session or Invalid Session' })
    return
  }

  try {
    const wishlist = await deleteCart(id)
    res.status(200).json({ items: wishlist, message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}
