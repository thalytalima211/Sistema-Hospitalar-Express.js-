import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function create(data) {
  return prisma.patient.create({ data });
}

export async function findByEmail(email) {
  return prisma.patient.findUnique({ where: { email } });
}

export async function findByCpf(cpf) {
  return prisma.patient.findUnique({ where: { cpf } });
}

export default { create, findByEmail, findByCpf }