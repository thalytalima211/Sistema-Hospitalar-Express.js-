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

export async function findById(id) {
  return prisma.patient.findUnique({ where: { id } });
}

export async function getAll() {
  return prisma.patient.findMany();
}

export async function update(id, data) {
  return prisma.patient.update({
    where: { id },
    data: {
      name: data.name,
      phone: data.phone,
      address: data.address
    }
  });
}

export default { create, findByEmail, findByCpf, findById, getAll, update }