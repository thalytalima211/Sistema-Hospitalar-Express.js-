import specialityService from "../services/speciality.service.js";

export const create = async (req, res, next) => {
  try {
    const speciality = await specialityService.createSpeciality(req.body)
    res.status(201).json(speciality)
  }catch (error) {
    next(error)
  }
}

export default { create }