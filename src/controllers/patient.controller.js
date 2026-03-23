import patientService from "../services/patient.service.js";

export const create = async (req, res, next) => {
  try {
    const patient = await patientService.createPatient(req.body)
    res.status(201).json(patient)
  }catch (error) {
    next(error)
  }
}

export const getAll = async (req, res, next) => {
  try {
    const patients = await patientService.getAllPatients()
    res.status(200).json(patients)
  } catch (error) {
    next(error)
  }
}

export const update = async (req, res, next) => {
  try {
    const { id } = req.params
    const patient = await patientService.updatePatient(id, req.body)
    res.status(200).json(patient)
  } catch (error) {
    next(error)
  }
}

export const getDetails = async (req, res, next) => {
  try{
    const { id } = req.params
    const patient = await patientService.getPatientDetails(id)
    res.status(200).json(patient)
  } catch (error) {
    next(error)
  }
}

export default { create, getAll, update, getDetails }