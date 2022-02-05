import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const items: Prisma.ItemCreateInput[] = [
  {
    name: 'name1',
    content: 'content1',
    active: true
  },
  {
    name: 'name2',
    content: 'content2',
    active: true
  },
  {
    name: 'name3',
    content: 'content3',
    active: true
  }
]

async function main () {
  for (const item of items) {
    const entry = await prisma.item.create({
      data: item
    })
    console.log(`Created user with id: ${entry.id}`)
  }
}

main()
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
