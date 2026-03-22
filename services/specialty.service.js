import specialtyRespository from "../repositories/specialty.respository.js";
import AppError from "../utils/AppError.js";

export const createspecialty = async (data) => {
  const { name } = data

  if (await specialtyRespository.findByName(name))
    throw new AppError("Especialidade já cadastrada", 400) 

  return specialtyRespository.create({ name }) 
}

export const getAllSpecialities = async () => {
  return specialtyRespository.getAll()
}

export const updateSpecialty = async (id, data) => {
  const specialty = await specialtyRespository.findById(id);
  if (!specialty) {
    throw new AppError("Especialidade não encontrada", 404);
  }
  return specialtyRespository.update(id, data);
}

export const getSpecialtyDetails = async (id) => {
  const specialty = await specialtyRespository.findById(id);
  if (!specialty) {
    throw new AppError("Especialidade não encontrada", 404);
  }
  return specialtyRespository.getDetails(id);
}

export default { createspecialty, getAllSpecialities, updateSpecialty, getSpecialtyDetails }