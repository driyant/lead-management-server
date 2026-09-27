import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import { seedLeads } from "./seeders";

const prisma = new PrismaClient();

async function main() {
  await seedLeads(prisma);

  console.log("Database seeded successfully.");
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });