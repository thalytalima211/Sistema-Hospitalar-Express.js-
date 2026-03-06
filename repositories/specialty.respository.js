import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function create(data) {
  return prisma.specialty.create({ data });
}

export async function findByName(name) {
  return prisma.specialty.findUnique({ where: { name } });
}

export async function findById(id) {
  return prisma.specialty.findUnique({ where: { id } });
}

export async function all(){
  return prisma.specialty.findMany();
}

export default { create, findByName, findById, all }