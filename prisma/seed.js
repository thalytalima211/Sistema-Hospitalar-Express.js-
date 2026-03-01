import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const existingAdmin = await prisma.user.findFirst({
    where: { role: "ADMIN" }
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await prisma.user.create({
      data: {
        name: "Administrador",
        email: "admin@hospital.com",
        password: hashedPassword,
        role: "ADMIN"
      }
    });

    console.log("Admin criado com sucesso.");
  } else {
    console.log("Admin já existe.");
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());