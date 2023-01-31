import React, { useEffect, useState, useCallback } from 'react'
import { categories, products } from '@prisma/client'
import Image from 'next/image'
import { Input, Pagination, SegmentedControl, Select } from '@mantine/core'
import { CATEGORY_MAP, FILTERS, TAKE } from 'constants/products'
import Search from '../../public/Search.svg'
import useDebounce from 'hooks/useDebounce'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Products() {
  const router = useRouter()
  const { data: session } = useSession()
  const [activePage, setPage] = useState(1)
  const [selectedCategory, setCategory] = useState<string>('-1')
  const [selectedFilter, setFilter] = useState<string | null>(FILTERS[0].value)
  const [keyword, setKeyword] = useState('')
  const debouncedKeyword = useDebounce<string>(keyword)

  // useEffect(() => {
  //   fetch('http://localhost:3000/api/get-categories')
  //     .then((res) => res.json())
  //     .then((data) => setCategories(data.items))
  // }, [])

  const { data: categories } = useQuery<
    { items: categories[] },
    unknown,
    categories[]
  >({
    queryKey: ['http://localhost:3000/api/get-categories'],
    queryFn: () =>
      fetch('http://localhost:3000/api/get-categories').then((res) =>
        res.json()
      ),
    select: (data) => data.items,
  })

  // useEffect(() => {
  //   fetch(
  //     `http://localhost:3000/api/get-products-count?category=${selectedCategory}&contains=${debouncedKeyword}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => setTotal(Math.ceil(data.items / TAKE)))
  //   //skip은 0 skip은 아무것도 안한다 take는 9개씩
  // }, [selectedCategory, debouncedKeyword])

  const { data: total } = useQuery({
    queryKey: [
      `http://localhost:3000/api/get-products-count?category=${selectedCategory}&contains=${debouncedKeyword}`,
    ],
    queryFn: () =>
      fetch(
        `http://localhost:3000/api/get-products-count?category=${selectedCategory}&contains=${debouncedKeyword}`
      ).then((res) => res.json()),
    select: (data) => Math.ceil(data.items / TAKE),
  })
  // useEffect(() => {
  //   const skip = TAKE * (activePage - 1)
  //   fetch(
  //     `http://localhost:3000/api/get-products?skip=${skip}&take=${TAKE}&category=${selectedCategory}&orderBy=${selectedFilter}&contains=${debouncedKeyword}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data.items))
  // }, [activePage, selectedCategory, selectedFilter, debouncedKeyword])

  //한번 조회한 내용은 다시 조회하지 않는다 이미 조회한 캐싱은 가지고 있어서 그대로 사용 다시 조회하지 않음! 좋네..
  const { data: products } = useQuery<
    { items: products[] },
    unknown,
    products[]
  >({
    queryKey: [
      `http://localhost:3000/api/get-products?skip=${
        TAKE * (activePage - 1)
      }&take=${TAKE}&category=${selectedCategory}&orderBy=${selectedFilter}&contains=${debouncedKeyword}`,
    ],
    queryFn: () =>
      fetch(
        `http://localhost:3000/api/get-products?skip=${
          TAKE * (activePage - 1)
        }&take=${TAKE}&category=${selectedCategory}&orderBy=${selectedFilter}&contains=${debouncedKeyword}`
      ).then((res) => res.json()),
    select: (data) => data.items,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }
  return (
    <div className="px-36 mt-36 mb-36">
      {session && <p> 안녕하세요. {session.user?.name}님</p>}
      <div className="mb-4">
        <Input
          icon={<Search />}
          placeholder="Search"
          value={keyword}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <Select value={selectedFilter} onChange={setFilter} data={FILTERS} />
      </div>
      {categories && (
        <div className="mb-4">
          <SegmentedControl
            value={selectedCategory}
            onChange={setCategory}
            data={[
              { label: 'ALL', value: '-1' },
              ...(categories &&
                categories.map((category) => ({
                  label: category.name,
                  value: String(category.id),
                }))),
            ]}
            color="dark"
          />
        </div>
      )}
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
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
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
      <div className="w-full flex mt-5">
        {total && (
          <Pagination
            className="m-auto"
            page={activePage}
            onChange={setPage}
            total={total}
          />
        )}
      </div>
    </div>
  )
}
