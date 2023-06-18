import type { NextApiRequest, NextApiResponse } from 'next'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@firebase/initFirebase'
import { CommentProps } from 'types/types'
import { isEmpty } from 'lodash'

async function getComments() {
  try {
    const comments: CommentProps[] = []
    const boardRef = collection(db, 'orders')
    const querySnapshot = await getDocs(
      query(boardRef, orderBy('timestamp', 'desc'))
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
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const comments = await getComments()
    res.status(200).json({ items: comments, message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed' })
  }
}
