// import ImageGallery from 'react-image-gallery'
import Carousel from 'nuka-carousel/lib/carousel'
import Image from 'next/image'
import React, { useState } from 'react'
import CustomEditor from '@components/Editor'
import { useRouter } from 'next/router'
import { convertFromRaw, EditorState } from 'draft-js'
import { GetServerSidePropsContext } from 'next'
import { Cart, OrderItem, products, Comment } from '@prisma/client'
import { format } from 'date-fns'
import { CATEGORY_MAP } from 'constants/products'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, validateJson } from '@mantine/core'
import IconHeart from '../../../public/Heart.svg'
import IconHeartbeat from '../../../public/Heartbeat.svg'
import IconShoppingCart from '../../../public/ShoppingCart.svg'
import { useSession } from 'next-auth/react'
import { CountControl } from '@components/CountControl'
import { CART_QUERY_KEY } from 'pages/cart'
import { ORDER_QUERY_KEY } from 'pages/my'
import CommentItem from '@components/CommentItem'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const product = await fetch(`/api/get-product?id=${context.params?.id}`)
    .then((res) => res.json())
    .then((data) => data.items)
  const comments = await fetch(
    `https://next-commerce-7i9t.vercel.app/api/get-comments?productId=${context.params?.id}`
  )
    .then((res) => res.json())
    .then((data) => data.items)
  return {
    props: {
      product: { ...product, images: [product.image_url, product.image_url] },
      comments: comments,
    },
  }
}

export interface CommentItemType extends Comment, OrderItem {}
const WISHLIST_QUERY_KEY =
  'https://next-commerce-7i9t.vercel.app/api/get-wishlist'
export default function Products(props: {
  product: products & { images: string[] }
  comments: CommentItemType[]
}) {
  const [index, setIndex] = useState(0)
  const { data: session } = useSession()
  const [quantity, setQuantity] = useState<number | undefined>(1)
  const router = useRouter()
  const queryClient = useQueryClient()
  const { id: productId } = router.query

  const [editorState] = useState<EditorState | undefined>(() =>
    props.product?.contents
      ? EditorState.createWithContent(
          convertFromRaw(JSON.parse(props.product.contents))
        )
      : EditorState.createEmpty()
  )

  const { data: wishlist } = useQuery([WISHLIST_QUERY_KEY], () =>
    fetch(WISHLIST_QUERY_KEY)
      .then((res) => res.json())
      .then((data) => data.items)
  )

  //장바구니 등록
  const { mutate, isLoading } = useMutation<unknown, unknown, string, any>(
    (productId: string) =>
      fetch('/api/update-wishlist', {
        method: 'POST',
        body: JSON.stringify({ productId }),
      })
        .then((res) => res.json())
        .then((data) => data.items),
    {
      onMutate: async (productId) => {
        //찜하기 업데이트 바로 반영
        await queryClient.cancelQueries([WISHLIST_QUERY_KEY])

        // Snapshot the previous value
        const previous = queryClient.getQueryData([WISHLIST_QUERY_KEY])

        // Optimistically update to the new value
        queryClient.setQueryData<string[]>([WISHLIST_QUERY_KEY], (old) =>
          old
            ? old.includes(String(productId))
              ? old.filter((id) => id !== String(productId))
              : old.concat(String(productId))
            : []
        )

        // Return a context object with the snapshotted value
        return { previous }
      },
      onError: (error, _, context) => {
        queryClient.setQueryData([WISHLIST_QUERY_KEY], context.previous)
      },
      onSuccess: () => {
        queryClient.invalidateQueries([WISHLIST_QUERY_KEY])
      },
    }
  )

  //Cart에서 id와 userId는 빼고 타입을 만들겠다
  const { mutate: addCart } = useMutation<
    unknown,
    unknown,
    Omit<Cart, 'id' | 'userId'>,
    any
  >(
    (item) =>
      fetch('/api/add-cart', {
        method: 'POST',
        body: JSON.stringify({ item }),
      })
        .then((res) => res.json())
        .then((data) => data.items),
    {
      onMutate: () => {
        queryClient.invalidateQueries([CART_QUERY_KEY])
      },
      onSuccess: () => {
        router.push('/cart')
      },
    }
  )

  const { mutate: addOrder } = useMutation<
    unknown,
    unknown,
    Omit<OrderItem, 'id'>[],
    any
  >(
    (items) =>
      fetch('/api/add-order', {
        method: 'POST',
        body: JSON.stringify({ items }),
      })
        .then((res) => res.json())
        .then((data) => data.items),
    {
      onMutate: () => {
        queryClient.invalidateQueries(['/api/add-order'])
      },
      onSuccess: () => {
        router.push('/my')
      },
    }
  )
  const product = props.product

  const validate = (type: 'cart' | 'order') => {
    alert('장바구니로 이동')
    if (quantity == null) {
      alert('최소 수량을 선택하세요')
      return
    }
    //TODO: 장바구니에 등록하는 기능추가
    if (type === 'cart') {
      addCart({
        productId: product.id,
        quantity: quantity,
        amount: product.price * quantity,
      })
    }

    if (type === 'order') {
      addOrder([
        {
          productId: product.id,
          quantity: quantity,
          amount: product.price * quantity,
          price: product.price,
        },
      ])
    }
  }

  const isWished =
    wishlist != null && productId != null
      ? wishlist.includes(String(productId))
      : false

  return (
    <>
      {product != null && productId != null ? (
        <div className="flex flex-row">
          <div style={{ maxWidth: 600, marginRight: 52 }}>
            <Carousel
              animation="fade"
              withoutControls={true}
              wrapAround
              speed={10}
              slideIndex={index}
            >
              {product?.images.map((url, idx) => (
                <Image
                  key={`url-carousel-${idx}`}
                  src={url}
                  alt="image"
                  width={600}
                  height={600}
                />
              ))}
            </Carousel>
            <div className="flex space-x-4 mt-2">
              {product?.images.map((url, idx) => (
                <div key={`url-thumb-${idx}`} onClick={() => setIndex(idx)}>
                  <Image src={url} alt="image" width={100} height={100} />
                </div>
              ))}
            </div>
            {editorState != null && (
              <CustomEditor editorState={editorState} readOnly />
            )}
            <div>
              <p className="text-2xl font-semibold">후기</p>
              {props.comments &&
                props.comments.map((comment, idx) => {
                  return (
                    <div key={idx}>
                      {comment.rate && <CommentItem item={comment} />}
                    </div>
                  )
                })}
            </div>
          </div>
          <div style={{ maxWidth: 600 }} className="flex flex-col space-y-6">
            <div className="text-lg text-zinc-400">
              {CATEGORY_MAP[product.category_id - 1]}
            </div>
            <div className="text-4xl font-semibold">{product.name}</div>
            <div className="text-lg">
              {product.price.toLocaleString('ko-kr')}원
            </div>
            <div>
              <span className="text-lg">수량</span>
              <CountControl value={quantity} setValue={setQuantity} max={200} />
            </div>
            <div className="flex space-x-3">
              <Button
                leftIcon={<IconShoppingCart />}
                style={{ backgroundColor: 'black' }}
                radius="xl"
                size="md"
                styles={{
                  root: { paddingRight: 14, height: 48 },
                }}
                onClick={() => {
                  if (session == null) {
                    alert('로그인이 필요해요')
                    router.push('auth/login')
                    return
                  }
                  validate('cart')
                }}
              >
                장바구니
              </Button>
              <Button
                // loading={isLoading}
                disabled={wishlist == null}
                leftIcon={
                  isWished ? (
                    <IconHeartbeat size={20} />
                  ) : (
                    <IconHeart size={20} />
                  )
                }
                style={{ backgroundColor: isWished ? 'red' : 'gray' }}
                radius="xl"
                size="md"
                styles={{
                  root: { paddingRight: 14, height: 48 },
                }}
                onClick={() => {
                  if (session == null) {
                    alert('로그인이 필요해요')
                    router.push('auth/login')
                    return
                  }
                  mutate(String(productId))
                }}
              >
                찜하기
              </Button>
            </div>
            <Button
              style={{ backgroundColor: 'black' }}
              radius="xl"
              size="md"
              styles={{
                root: { paddingRight: 14, height: 48 },
              }}
              onClick={() => {
                if (session == null) {
                  alert('로그인이 필요해요')
                  router.push('auth/login')
                  return
                }
                validate('order')
              }}
            >
              구매하기
            </Button>
            <div className="text-sm text-zinc-300">
              등록: {format(new Date(product.createdAt), 'yyyy년 M월 d일')}
            </div>
          </div>
        </div>
      ) : (
        <div>로딩중</div>
      )}
    </>
  )
}
