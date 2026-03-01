import { de } from 'zod/locales'
import authService from '../services/auth.service.js'

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) 
      return res.status(400).json({ message: 'Email e senha são obrigatórios' })

    const result = await authService.login({ email, password })

    return res.status(200).json(result)

  } catch (error) {
    return res.status(401).json({ message: error.message })
  }
}

export default { login }