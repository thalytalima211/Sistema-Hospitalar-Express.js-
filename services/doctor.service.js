import doctorRepository from "../repositories/doctor.repository.js";
import userRepository from "../repositories/user.repository.js";
import specialtyRespository from "../repositories/specialty.respository.js";
import AppError from "../utils/AppError.js";

export const createDoctor = async (data) => {
  const { email, crm, specialtyId } = data

  const existingDoctor = await doctorRepository.findByCrm(crm);
  if (existingDoctor) 
    throw new AppError("Médico com este CRM já existe", 400);
  
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) 
    throw new AppError("Email já cadastrado", 400);

  const specialty = await specialtyRespository.findById(specialtyId);
  if (!specialty) 
    throw new AppError("Especialidade não encontrada", 404);

  return doctorRepository.create(data);
};

export const getAllDoctors = async () => {
  return doctorRepository.getAll();
}

export async function updateDoctor(id, data) {
  const doctor = await doctorRepository.findById(id);
  if (!doctor) {
    throw new AppError("Médico não encontrado", 404);
  }

  return doctorRepository.update(id, data);
}

export async function deactivateDoctor(id) {
  const doctor = await doctorRepository.findById(id);
  if (!doctor) {
    throw new AppError("Médico não encontrado", 404);
  }
  return doctorRepository.deactivate(id);
}

export async function activateDoctor(id) {
  const doctor = await doctorRepository.findById(id);
  if (!doctor) {
    throw new AppError("Médico não encontrado", 404);
  }
  return doctorRepository.activate(id);
}

export async function getDoctorDetails(id, loggedUser){
  if(loggedUser.role === "DOCTOR" && loggedUser.doctorId !== id){
    throw new AppError("Acesso negado", 403);
  }
  const doctor = await doctorRepository.findById(id);
  if (!doctor) {
    throw new AppError("Médico não encontrado", 404);
  }

  return doctorRepository.getDetails(id)
}

export default { createDoctor, getAllDoctors, updateDoctor, deactivateDoctor, activateDoctor, getDoctorDetails }