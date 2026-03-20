import appointmentRepository from "../repositories/appointment.repository.js";
import doctorRepository from "../repositories/doctor.repository.js";
import patientRepository from "../repositories/patient.repository.js";
import AppError from "../utils/AppError.js";

export const createAppointment = async (data) => {
  const doctor = await doctorRepository.findById(data.doctorId);
  if (!doctor) 
    throw new AppError("Médico não encontrado", 404);

  const patient = await patientRepository.findById(data.patientId);
  if (!patient) 
    throw new AppError("Paciente não encontrado", 404);

  if(data.startTime < new Date())
    throw new AppError("Consulta não pode ser agendada para uma data passada", 400);

  if(data.duration <= 0)
    throw new AppError("Duração da consulta inválida", 400);

  const appointmentStart = new Date(data.startTime);
  const appointmentEnd = new Date(appointmentStart.getTime() + data.duration * 60000);

  const scheduledAppointments = await doctorRepository.getScheduledAppointments(doctor.id);
  for(const appointment of scheduledAppointments) {
    const existingStart = new Date(appointment.startTime);
    const existingEnd = new Date(existingStart.getTime() + appointment.duration * 60000);
    if (appointmentStart < existingEnd && appointmentEnd > existingStart) {
      throw new AppError("Horário indisponível para agendamento", 400);
    }
  }

  return appointmentRepository.create(data);
}

export default { createAppointment }