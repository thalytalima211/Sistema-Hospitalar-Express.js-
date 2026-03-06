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

export default { createDoctor }