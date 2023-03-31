import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const orderList = [
    {
      customerId: 1,
      itemName: '테스트 상품',
      price: 20000,
      regId: 'admin',
      regNm: 'admin',
      regDt: new Date(),
      chgId: 'admin',
      chgNm: 'admin',
      chgDt: new Date(),
    },
    {
      customerId: 2,
      itemName: '테스트 상품',
      price: 30000,
      regId: 'admin',
      regNm: 'admin',
      regDt: new Date(),
      chgId: 'admin',
      chgNm: 'admin',
      chgDt: new Date(),
    },
    {
      customerId: 3,
      itemName: '테스트 상품',
      price: 40000,
      regId: 'admin',
      regNm: 'admin',
      regDt: new Date(),
      chgId: 'admin',
      chgNm: 'admin',
      chgDt: new Date(),
    },
  ];

  for await (const order of orderList) {
    await prisma.order.create({
      data: order,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
