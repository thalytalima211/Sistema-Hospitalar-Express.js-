import specialtyService from "../services/specialty.service.js";

export const create = async (req, res, next) => {
  try {
    const specialty = await specialtyService.createspecialty(req.body)
    res.status(201).json(specialty)
  }catch (error) {
    next(error)
  }
}

export const getAll = async (req, res, next) => {
  try {
    const specialities = await specialtyService.getAllSpecialities()
    res.status(200).json(specialities)
  } catch (error) {
    next(error)
  }
}

export default { create, getAll }