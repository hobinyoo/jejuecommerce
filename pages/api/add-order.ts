import { authOption } from './auth/[...nextauth]'
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, OrderItem } from '@prisma/client'
import { getSession } from 'next-auth/react'

const prisma = new PrismaClient()

async function addOrder(
  userId: string,
  items: Omit<OrderItem, 'id'>[],
  orderInfo?: { recevier: string; address: string; phoneNumber: string }
) {
  try {
    // orderItem 들을 만든다.

    let orderItemIds = []
    for (const item of items) {
      const orderItem = await prisma.orderItem.create({
        data: {
          ...item,
        },
      })
      console.log(`Created id: ${orderItem.id}`)
      orderItemIds.push(orderItem.id)
    }

    console.log(JSON.stringify(orderItemIds))
    // 만들어진 orderItemIds 를 포함한 order를 만든다.

    const response = await prisma.orders.create({
      data: {
        userId,
        orderItemIds: orderItemIds.join(','),
        ...orderInfo,
        status: 0,
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
  const { items, orderInfo } = JSON.parse(req.body)

  if (session == null) {
    res.status(200).json({ items: [], message: 'no Session' })
    return
  }

  try {
    const wishlist = await addOrder(String(session.user.id), items, orderInfo)
    res.status(200).json({ items: wishlist, message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}
