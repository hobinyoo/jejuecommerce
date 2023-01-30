import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const sneakers = [
  {
    name: `Sneakers 1`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NS95N51B_NS95N51B_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `Sneakers 2`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NS95N51B_NS95N51B_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `Sneakers 3`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NS95N51B_NS95N51B_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `Sneakers 4`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NS95N51B_NS95N51B_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `Sneakers 5`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NS95N51B_NS95N51B_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `Sneakers 6`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NS95N51B_NS95N51B_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `Sneakers 7`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NS95N51B_NS95N51B_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `Sneakers 8`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NS95N51B_NS95N51B_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `Sneakers 9`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NS95N51B_NS95N51B_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `Sneakers 10`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NS95N51B_NS95N51B_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
]
const tShirt = [
  {
    name: 'tshirt 1',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5MP06J_NM5MP06J_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'tshirt 2',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5MP06J_NM5MP06J_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'tshirt 3',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5MP06J_NM5MP06J_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'tshirt 4',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5MP06J_NM5MP06J_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'tshirt 5',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5MP06J_NM5MP06J_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'tshirt 6',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5MP06J_NM5MP06J_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'tshirt 7',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5MP06J_NM5MP06J_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'tshirt 8',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5MP06J_NM5MP06J_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'tshirt 9',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5MP06J_NM5MP06J_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'tshirt 10',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5MP06J_NM5MP06J_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
]
const pants = [
  {
    name: 'pants 1',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NP6KP02C_NP6KP02C_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'pants 2',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NP6KP02C_NP6KP02C_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'pants 3',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NP6KP02C_NP6KP02C_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'pants 4',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NP6KP02C_NP6KP02C_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'pants 5',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NP6KP02C_NP6KP02C_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'pants 6',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NP6KP02C_NP6KP02C_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'pants 7',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NP6KP02C_NP6KP02C_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'pants 8',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NP6KP02C_NP6KP02C_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'pants 9',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NP6KP02C_NP6KP02C_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'pants 10',
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NP6KP02C_NP6KP02C_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
]
const cap = [
  {
    name: `Cap 1`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NE3CN64D_NE3CN64D_primary.jpg?gallery',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `Cap 2`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NE3CN64D_NE3CN64D_primary.jpg?gallery',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `Cap 3`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NE3CN64D_NE3CN64D_primary.jpg?gallery',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `Cap 4`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NE3CN64D_NE3CN64D_primary.jpg?gallery',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `Cap 5`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NE3CN64D_NE3CN64D_primary.jpg?gallery',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `Cap 6`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NE3CN64D_NE3CN64D_primary.jpg?gallery',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `Cap 7`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NE3CN64D_NE3CN64D_primary.jpg?gallery',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `Cap 8`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NE3CN64D_NE3CN64D_primary.jpg?gallery',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `Cap 9`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NE3CN64D_NE3CN64D_primary.jpg?gallery',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `Cap 10`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NE3CN64D_NE3CN64D_primary.jpg?gallery',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
]

const hoodie = [
  {
    name: `hoodie 1`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5PN50K_NM5PN50K_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `hoodie 2`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5PN50K_NM5PN50K_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `hoodie 3`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5PN50K_NM5PN50K_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `hoodie 4`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5PN50K_NM5PN50K_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `hoodie 5`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5PN50K_NM5PN50K_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `hoodie 6`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5PN50K_NM5PN50K_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `hoodie 7`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5PN50K_NM5PN50K_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `hoodie 8`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5PN50K_NM5PN50K_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `hoodie 9`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5PN50K_NM5PN50K_hover.jpg?browse',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: `hoodie 10`,
    contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://image.thenorthfacekorea.co.kr/cmsstatic/product/NM5PN50K_NM5PN50K_hover.jpg?browse',
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
