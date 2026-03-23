import authService from '../services/auth.service.js'

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const result = await authService.login({ email, password })
    return res.status(200).json(result)
  } catch (error) {
    return res.status(401).json({ message: error.message })
  }
}

export default { login }