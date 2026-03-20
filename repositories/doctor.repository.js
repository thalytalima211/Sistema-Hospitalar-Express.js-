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

export const findById = async (id) => {
  return prisma.doctor.findUnique({
    where: { id },
  });
}

export async function getAll() {
  const doctors = await prisma.doctor.findMany({
    where: { active: true },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      specialty: {
        select: {
          name: true,
        },
      },
    },
  })

  return doctors.map(doc => ({
    id: doc.id,
    name: doc.user.name,
    email: doc.user.email,
    specialty: doc.specialty.name,
    phone: doc.phone,
    crm: doc.crm,
  }));
}

export async function update(id, data) {
  return prisma.doctor.update({
    where: { id },
    data: {
      phone: data.phone,
      crm: data.crm,
      specialtyId: data.specialtyId
    }
  });
}

export async function deactivate(id) {
  return prisma.doctor.update({
    where: { id },
    data: {
      active: false
    }
  });
}

export async function activate(id) {
  return prisma.doctor.update({
    where: { id },
    data: {
      active: true
    }
  });
}

export default { create, findByCrm, findById,getAll, update, deactivate, activate }