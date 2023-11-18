import { useRouter } from 'next/router'
import { useEffect } from 'react'

const PaymentsFail = () => {
  const router = useRouter()

  useEffect(() => {
    if (router.query.message) {
      alert(router.query.message)
      router.push('/')
    }
  }, [router])
  return null
}

export default PaymentsFail
