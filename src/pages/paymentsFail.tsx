import { useRouter } from 'next/router'
import { useEffect } from 'react'

const PaymentsFail = () => {
  const router = useRouter()

  useEffect(() => {
    alert('사용자가 결제를 취소하였습니다.')
    router.push('/')
  }, [])
  return null
}

export default PaymentsFail
