import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const items: Prisma.ItemCreateInput[] = [
  {
    name: "Name 1",
    content: "Content 1",
    link: "Link 1",
    active: true,
  },
  {
    name: "Name 2",
    content: "Content 2",
    link: "Link 2",
    active: true,
  },
  {
    name: "Name 3",
    content: "Content 3",
    link: "Link 3",
    active: true,
  },
];

async function main() {
  const list = [];
  for (const item of items) {
    const entry = await prisma.item.create({
      data: item,
    });
    list.push(entry);
  }
  return list;
}

main()
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(1);
  });
