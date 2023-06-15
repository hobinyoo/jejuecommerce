// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore'
import { db } from '../../../firebase/initFirebase'
import { CommentProps } from 'types/types'
import { isEmpty } from 'lodash'

async function getComments() {
  try {
    const comments: CommentProps[] = []
    const boardRef = collection(db, 'orders')
    const querySnapshot = await getDocs(
      query(
        boardRef,
        orderBy('timestamp', 'desc')
        // where('name', '==', '유호빈')
        // TODO: 나중에 날짜를 비교해서 날짜 같은 것끼리 묶어줘야함
      )
    )

    querySnapshot.forEach((doc) => {
      if (!isEmpty(doc.data().content)) {
        comments.push({
          menu: doc.data().menu,
          content: doc.data().content,
          rating: doc.data().rating,
          images: doc.data().images,
          commentTimestamp: doc.data().commentTimestamp,
          uid: doc.data().uid,
          id: doc.id,
        })
      }
    })
    return comments
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
  try {
    const comments = await getComments()
    res.status(200).json({ items: comments, message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}
