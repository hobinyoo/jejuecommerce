import { useEffect, useState } from 'react'
import { products } from '@prisma/client'
const Take = 9
export default function Products() {
  const [skip, setSkip] = useState(0)
  const [products, setProducts] = useState<products[]>([])

  useEffect(() => {
    //skip은 0 skip은 아무것도 안한다 take는 9개씩
    fetch(`api/get-products?skip=0&take=${Take}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.items))
  }, [])
  return (
    <div>
      {products && products.map((item) => <div key={item.id}>{item.name}</div>)}
    </div>
  )
}
