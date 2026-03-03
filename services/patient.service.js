import patientRepository from '../repositories/patient.repository.js'
import AppError from "../utils/AppError.js"

export const createPatient = async (data) => {
  const { name, email, cpf, phone, address } = data

  if (await patientRepository.findByEmail(email)) 
    throw new AppError("Email já cadastrado", 400)
  if (await patientRepository.findByCpf(cpf))
    throw new AppError("CPF já cadastrado", 400)

  return patientRepository.create({
    name,
    email,
    cpf,
    phone,
    address
  })
}

export default { createPatient }