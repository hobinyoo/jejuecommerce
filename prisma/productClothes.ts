import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const sneakers = [
  {
    name: `Sneakers 1`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a Sneakers ${1}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NS91P01C_NS91P01C_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `Sneakers 2`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a Sneakers ${2}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NS91P02C_NS91P02C_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `Sneakers 3`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a Sneakers ${3}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NS95P04A_NS95P04A_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `Sneakers 4`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a Sneakers ${4}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NS91P05A_NS91P05A_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `Sneakers 5`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a Sneakers ${5}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NS95P03B_NS95P03B_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `Sneakers 6`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a Sneakers ${6}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NS95P03C_NS95P03C_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `Sneakers 7`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a Sneakers ${7}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NS95P03A_NS95P03A_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `Sneakers 8`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a Sneakers ${8}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NS91N55A_NS91N55A_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `Sneakers 9`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a Sneakers ${9}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NS91N55B_NS91N55B_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `Sneakers 10`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a Sneakers ${10}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NS95N63C_NS95N63C_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
]
const tShirt = [
  {
    name: 'tshirt 1',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a tshirt ${1}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5MP01J_NM5MP01J_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'tshirt 2',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a tshirt ${2}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5MP01K_NM5MP01K_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'tshirt 3',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a tshirt ${3}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/4000031992/NM5MP01L_NM5MP01L_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'tshirt 4',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a tshirt ${4}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5MP06J_NM5MP06J_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'tshirt 5',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a tshirt ${5}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5MP06K_NM5MP06K_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'tshirt 6',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a tshirt ${6}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5MP06L_NM5MP06L_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'tshirt 7',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a tshirt ${7}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5MP01A_NM5MP01A_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'tshirt 8',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a tshirt ${8}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5MP01B_NM5MP01B_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'tshirt 9',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a tshirt ${9}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5MP01C_NM5MP01C_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'tshirt 10',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a tshirt ${10}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5MP03A_NM5MP03A_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
]
const pants = [
  {
    name: 'pants 1',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a pants ${1}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NP6NP00A_NP6NP00A_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'pants 2',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a pants ${2}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NP6NP00B_NP6NP00B_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'pants 3',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a pants ${3}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NP6NP00C_NP6NP00C_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'pants 4',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a pants ${4}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NP6KP02A_NP6KP02A_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'pants 5',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a pants ${5}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NP6KP02C_NP6KP02C_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'pants 6',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a pants ${6}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NP6NP01C_NP6NP01C_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'pants 7',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a pants ${7}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NP6NP15B_NP6NP15B_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'pants 8',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a pants ${8}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NP6NP15C_NP6NP15C_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'pants 9',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a pants ${9}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NP6KP06J_NP6KP06J_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'pants 10',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a pants ${10}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NP6KP06K_NP6KP06K_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
]
const cap = [
  {
    name: `Cap 1`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a Cap ${1}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NE3CN67A_NE3CN67A_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `Cap 2`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a Cap ${2}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NE3CN64D_NE3CN64D_primary.jpg?gallery',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `Cap 3`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a Cap ${3}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NE3CN67B_NE3CN67B_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `Cap 4`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a Cap ${4}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NE3CN53C_NE3CN53C_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `Cap 5`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a Cap ${5}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NE3CN52B_NE3CN52B_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `Cap 6`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a Cap ${6}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NE3CN52C_NE3CN52C_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `Cap 7`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a Cap ${7}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NE3CN71B_NE3CN71B_primary.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `Cap 8`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a Cap ${8}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NE3CN50D_NE3CN50D_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `Cap 9`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a Cap ${9}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NE3CN50E_NE3CN50E_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `Cap 10`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a Cap ${10}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NE3CN51M_NE3CN51M_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
]

const hoodie = [
  {
    name: `hoodie 1`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a hoodie ${1}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5PP40A_NM5PP40A_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `hoodie 2`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a hoodie ${2}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5PN50K_NM5PN50K_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `hoodie 3`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a hoodie ${3}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5PP40C_NM5PP40C_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `hoodie 4`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a hoodie ${4}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5PP40D_NM5PP40D_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `hoodie 5`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a hoodie ${5}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5PP40E_NM5PP40E_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `hoodie 6`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a hoodie ${6}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5PP41A_NM5PP41A_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `hoodie 7`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a hoodie ${7}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5PP41B_NM5PP41B_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `hoodie 8`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a hoodie ${8}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5PP42A_NM5PP42A_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `hoodie 9`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a hoodie ${9}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5PP42B_NM5PP42B_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `hoodie 10`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a hoodie ${10}! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5PP42C_NM5PP42C_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
]

const productData: Prisma.productsCreateInput[] = [
  ...sneakers,
  ...tShirt,
  ...pants,
  ...cap,
  ...hoodie,
]

async function main() {
  await prisma.products.deleteMany({})

  const CATEGORIES = ['Sneakers', 'T-Shirt', 'Pants', 'Cap', 'Hoodie']
  CATEGORIES.forEach(async (c, i) => {
    const product = await prisma.categories.upsert({
      where: {
        id: i + 1,
      },
      update: {
        name: c,
      },
      create: {
        name: c,
      },
    })
    console.log(`Upsert category id: ${product.id}`)
  })
  for (const p of productData) {
    const product = await prisma.products.create({
      data: p,
    })
    console.log(`Created id: ${product.id}`)
  }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
