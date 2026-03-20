import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function create(data) {
  return prisma.appointment.create({ data });
}

export default { create }