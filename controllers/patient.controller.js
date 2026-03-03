import patientService from "../services/patient.service.js";

export const create = async (req, res, next) => {
  try {
    const patient = await patientService.createPatient(req.body)
    res.status(201).json(patient)
  }catch (error) {
    next(error)
  }
}

export default { create }