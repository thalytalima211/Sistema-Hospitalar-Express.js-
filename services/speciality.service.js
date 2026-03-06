import specialityRespository from "../repositories/speciality.respository.js";
import AppError from "../utils/AppError.js";

export const createSpeciality = async (data) => {
  const { name } = data

  if (await specialityRespository.findByName(name))
    throw new AppError("Especialidade já cadastrada", 400) 

  return specialityRespository.create({ name }) 
}

export default { createSpeciality }