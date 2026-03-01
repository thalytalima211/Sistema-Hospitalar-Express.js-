import bcrypt from "bcrypt"
import AppError from "../utils/AppError.js"
import userRepository from '../repositories/user.repository.js'

export const createUser = async (data) => {
  const { name, email, password, role } = data

    const existingUser = await userRepository.findByEmail(email)
    if (existingUser) {
      throw new AppError("Email já cadastrado", 400)
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    return userRepository.create({
      name,
      email,
      password: hashedPassword,
      role
    })
}

export default { createUser }