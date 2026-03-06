import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export async function create(data) {
  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      role: "DOCTOR",

      doctor: {
        create: {
          phone: data.phone,
          crm: data.crm,
          specialtyId: data.specialtyId
        }
      }
    },
    include: {
      doctor: true
    }
  });
}

export async function findByCrm(crm) {
    return prisma.doctor.findUnique({ where: { crm } });
}

export default { create, findByCrm }