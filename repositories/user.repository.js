import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function findByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

export async function create(data) {
  return prisma.user.create({ data });
}
