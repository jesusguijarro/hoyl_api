import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@hoyl.com" },
    update: {},
    create: {
      id: 1,
      email: "admin@hoyl.com",
      names: "admin",
      lastNames: "admin",
      password: "admin"
    }
  });
  console.log({ admin });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });