import { useQuery } from '@tanstack/react-query'
import { products } from '@prisma/client'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { CATEGORY_MAP } from 'constants/products'
export default function Wishlist() {
  const router = useRouter()
  const { data: products } = useQuery<
    { items: products[] },
    unknown,
    products[]
  >({
    queryKey: ['/api/get-wishlists'],
    queryFn: () => fetch('/api/get-wishlists').then((res) => res.json()),
    select: (data) => data.items,
  })
  return (
    <div>
      <p className="text-2xl mb-4">내가 찜한 상품</p>
      {products && (
        <div className="grid grid-cols-3 gap-5">
          {products.map((item) => {
            return (
              <div
                key={item.id}
                style={{ maxWidth: 310 }}
                onClick={() => router.push(`/products/${item.id}`)}
              >
                <Image
                  className="rounded"
                  src={item.image_url ?? ''}
                  width={310}
                  height={390}
                  alt={item.name}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkrQcAAI8AhoR/eeoAAAAASUVORK5CYII="
                />

                <div className="flex">
                  <span> {item.name}</span>
                  <span className="ml-auto">
                    {item.price.toLocaleString('ko-KR')}원
                  </span>
                </div>
                <span className="text-zinc-400">
                  {CATEGORY_MAP[item.category_id - 1]}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
