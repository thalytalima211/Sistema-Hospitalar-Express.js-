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

export async function getDetails(id){
  const patient = await prisma.patient.findUnique({ where: { id } })
  const scheduled = await prisma.appointment.findMany({
    where: { status: "SCHEDULED", patientId: id },
    orderBy: { startTime: "asc" },
    include: {
      doctor: {
        include: {
          user: true
        }
      }
    }
  })
  scheduled.forEach(app => {
    app.doctorName = app.doctor.user.name
    app.doctorPhone = app.doctor.phone
    delete app.patientId
    delete app.status
    delete app.doctor
  })

  const canceled = await prisma.appointment.findMany({
    where: { status: "CANCELED", patientId: id },
    orderBy: { startTime: "desc" },
    include: {
      doctor: {
        include: {
          user: true
        }
      }
    }
  })

  canceled.forEach(app => {
    app.doctorName = app.doctor.user.name
    app.doctorPhone = app.doctor.phone
    delete app.patientId
    delete app.status
    delete app.doctor
  })

  const completed = await prisma.appointment.findMany({
    where: { status: "COMPLETED", patientId: id },
    orderBy: { startTime: "desc" },
    include: {
      medicalRecord: true,
      doctor: {
        include: {
          user: true
        }
      }
    }
  })
  completed.forEach(app => {
    app.doctorName = app.doctor.user.name
    app.doctorPhone = app.doctor.phone
    delete app.patientId
    delete app.status
    delete app.doctor
  })

  return{
    patient,
    appointments: { scheduled, completed, canceled }
  }
}

export default { create, findByEmail, findByCpf, findById, getAll, update, getDetails }