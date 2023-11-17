import { useRouter } from 'next/router'
import { useEffect } from 'react'

const paymentsFail = () => {
  const router = useRouter()

  useEffect(() => {
    if (router.query.message) {
      alert(router.query.message)
      router.push('/')
    }
  }, [router.query.message])
  return null
}

export default paymentsFail
