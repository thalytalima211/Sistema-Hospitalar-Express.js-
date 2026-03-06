import specialtyRespository from "../repositories/specialty.respository.js";
import AppError from "../utils/AppError.js";

export const createspecialty = async (data) => {
  const { name } = data

  if (await specialtyRespository.findByName(name))
    throw new AppError("Especialidade já cadastrada", 400) 

  return specialtyRespository.create({ name }) 
}

export const getAllSpecialities = async () => {
  return specialtyRespository.all()
}
  
export default { createspecialty, getAllSpecialities }