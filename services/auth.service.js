import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as userRepository from '../repositories/user.repository.js'

export class AuthService {
  constructor() {
    this.userRepository = userRepository
  }

  async login({ email, password }) {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new Error('Conta não encontrada. Verifique suas credenciais e tente novamente.')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('Credenciais inválidas. Verifique suas credenciais e tente novamente.')
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role
      }
    }
  }
}