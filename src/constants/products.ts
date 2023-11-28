export const CATEGORY_MAP = ['Sneakers', 'T-Shirt', 'Pants', 'Cap', 'Hoodie']

export const TAKE = 9

export const FILTERS = [
  {
    label: '최신순',
    value: 'latest',
  },
  { label: '가격 높은 순', value: 'expensive' },
  { label: '가격 낮은 순', value: 'cheap ' },
]

export const getOrderBy = (orderBy?: string) => {
  return orderBy
    ? orderBy === 'latest'
      ? { orderBy: { createdAt: 'desc' } }
      : orderBy === 'expensive'
      ? { orderBy: { price: 'desc' } }
      : { orderBy: { price: 'asc' } }
    : undefined
}

export const menuData = [
  {
    title: '한우설렁탕',
    price: '13,000원',
    quantity: 0,
    image_url: '/images/selungtang.png',
  },
  {
    title: '한우곰탕',
    price: '12,000원',
    quantity: 0,
    image_url: '/images/gomtang.png',
  },
  {
    title: '한우갈비탕',
    price: '18,000원',
    quantity: 0,
    image_url: '/images/galbitang2.png',
  },
]
