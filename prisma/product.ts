import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const productData: Prisma.productsCreateInput[] = Array.apply(
  null,
  Array(120)
).map((_, index) => ({
  name: `Dark Jean ${index + 1}`,
  contents: `{"blocks":[{"key":"3dee5","text":"This is a DarkJean ${
    index + 1
  }! i did it!!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
  category_id: 1,
  image_url: 'https://picsum.photos/id/1011/250/150/',
  price: Math.floor(Math.random() * (100000 - 20000) + 20000),
}))


async function main() {
  await prisma.products.deleteMany({})

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
