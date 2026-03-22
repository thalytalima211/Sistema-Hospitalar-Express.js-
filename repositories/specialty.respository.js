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

export async function getAll(){
  return prisma.specialty.findMany();
}

export async function update(id, data) {
  return prisma.specialty.update({
    where: { id },
    data,
  });
}

export async function getDetails(id) {
  const specialty = await prisma.specialty.findUnique({ where: { id }})
  const doctors = await prisma.doctor.findMany({
    where: { specialtyId: id },
    include: { user: true }
  })
  doctors.forEach(app => {
    app.doctorName = app.user.name
    delete app.user
    delete app.specialtyId
    delete app.userId
  })

  return { specialty, doctors }
}

export default { create, findByName, findById, getAll, update, getDetails }