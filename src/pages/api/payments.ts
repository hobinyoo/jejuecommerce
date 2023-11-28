import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { orderId, paymentKey, amount } = req.query

  const url = 'https://api.tosspayments.com/v1/payments/confirm'
  const basicToken = Buffer.from(
    `${process.env.NEXT_PUBLIC_SECRET_KEY}:`,
    'utf-8'
  ).toString('base64')

  await fetch(url, {
    method: 'post',
    body: JSON.stringify({
      amount,
      orderId,
      paymentKey,
    }),
    headers: {
      Authorization: `Basic ${basicToken}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())

  //TODO: DB 처리
  res.redirect(`/paymentsRedirect?orderId=${orderId}`)
}
