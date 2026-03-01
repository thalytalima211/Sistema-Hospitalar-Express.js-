import userService from '../services/user.service.js'

export const create = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body)

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    })
  } catch (error) {
    next(error)
  }
}

export default { create }