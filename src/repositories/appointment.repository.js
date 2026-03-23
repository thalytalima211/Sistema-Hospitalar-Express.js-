import { PrismaClient } from "@prisma/client";
import formatDateTime from "../utils/formatDateTime.js";
const prisma = new PrismaClient();

export async function create(data) {
  return prisma.appointment.create({ data });
}

export async function getAll(){
  const scheduled = await prisma.appointment.findMany({
    where: { status: "SCHEDULED" },
    orderBy: { startTime: "asc" },
    include: {
      patient: true,
      doctor: {
        include: {
          user: true,
          specialty: true
        }
      }
    }
  });

  scheduled.forEach(app => {
    const {date, time} = formatDateTime(app.startTime)
    app.date = date
    app.time = time

    app.doctor.name = app.doctor.user.name;
    app.doctor.specialtyName = app.doctor.specialty.name;
    app.patientName = app.patient.name;
    app.patientPhone = app.patient.phone;

    delete app.startTime;
    delete app.doctor.user;
    delete app.doctor.userId;
    delete app.doctor.specialty;
    delete app.patient;
    delete app.doctorId;
    delete app.doctor.active;
    delete app.status
  });
  
  const completed = await prisma.appointment.findMany({
    where: { status: "COMPLETED" },
    orderBy: { startTime: "desc" },
    include: {
      patient: true,
      doctor: {
        include: {
          user: true,
          specialty: true
        }
      }
    }
  });

  completed.forEach(app => {
    const {date, time} = formatDateTime(app.startTime)
    app.date = date
    app.time = time

    app.doctor.name = app.doctor.user.name;
    app.doctor.specialtyName = app.doctor.specialty.name;
    app.patientName = app.patient.name;
    app.patientPhone = app.patient.phone;

    delete app.startTime;
    delete app.doctor.user;
    delete app.doctor.userId;
    delete app.doctor.specialty;
    delete app.patient;
    delete app.doctorId;
    delete app.doctor.active;
    delete app.status
  });

  return { scheduled, completed };
}

export async function findById(id) {
  return prisma.appointment.findUnique({ where: { id } });
}

export async function cancel(id) {
  return prisma.appointment.update({
    where: { id },
    data: { status: "CANCELED" }
  });
}

export async function complete(id, data) {
  const medicalRecord = await prisma.medicalRecord.create({
    data: {
      appointmentId: id,
      ...data
    }
  })
  const appointment = await prisma.appointment.update({
    where: { id },
    data: { status: "COMPLETED" }
  });
  return { medicalRecord, appointment }
}

export async function reschedule(id, data){
  return prisma.appointment.update({
    where: { id },
    data: {
      startTime: data.startTime,
      duration: data.duration,
      status: "SCHEDULED"
    }
  });
}

export default { create, getAll, findById, cancel, complete, reschedule }