import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function deleteOrder(orderItemIds: number) {
  try {
    const response = await prisma.orders.delete({
      where: {
        id: orderItemIds,
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
  //post 요청이기 때문에 body에서 꺼내옴
  const { orderItemIds } = JSON.parse(req.body)
  
  if (orderItemIds == null) {
    res.status(400).json({ message: 'no id or orderItemId' })
    return
  }

  try {
    const products = await deleteOrder(orderItemIds)
    res.status(200).json({ items: products, message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}
