import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function create(data) {
  return prisma.speciality.create({ data });
}

export async function findByName(name) {
  return prisma.speciality.findUnique({ where: { name } });
}

export default { create, findByName }