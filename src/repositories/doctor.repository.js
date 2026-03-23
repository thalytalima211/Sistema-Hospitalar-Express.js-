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

export async function getScheduledAppointments(doctorId) {
  return prisma.appointment.findMany({
    where: { doctorId, status: "SCHEDULED" },
    orderBy: { startTime: "asc" }
  });
}

export async function getDetails(id){
  const doctor = await prisma.doctor.findUnique({ where: { id } })
  const scheduled = await prisma.appointment.findMany({
    where: { status: "SCHEDULED", doctorId: id },
    orderBy: { startTime: "asc" },
    include: {
      patient: true
    }
  })
  scheduled.forEach(app => {
    app.patientName = app.patient.name
    app.patientPhone = app.patient.phone
    delete app.patient
    delete app.doctorId
    delete app.status
  })

  const canceled = await prisma.appointment.findMany({
    where: { status: "CANCELED", doctorId: id },
    orderBy: { startTime: "desc" },
    include: {
      patient: true
    }
  })

  canceled.forEach(app => {
    app.patientName = app.patient.name
    app.patientPhone = app.patient.phone
    delete app.patient
    delete app.doctorId
    delete app.status
  })

  const completed = await prisma.appointment.findMany({
    where: { status: "COMPLETED", doctorId: id },
    orderBy: { startTime: "desc" },
    include: {
      medicalRecord: true,
      patient: true
    }
  })
  completed.forEach(app => {
    app.patientName = app.patient.name
    app.patientPhone = app.patient.phone
    delete app.patient
    delete app.doctorId
    delete app.status
  })

  return{
    doctor,
    appointments: { scheduled, completed, canceled }
  }
}

export default { create, findByCrm, findById,getAll, update, deactivate, activate, getScheduledAppointments, getDetails }