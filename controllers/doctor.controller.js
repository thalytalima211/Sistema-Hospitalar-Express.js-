import doctorService from "../services/doctor.service.js";

export const create = async (req, res, next) => {
  try {
    const doctor = await doctorService.createDoctor(req.body)
    res.status(201).json({
        id: doctor.id,
        name: doctor.name,
        email: doctor.email,        
        crm: doctor.crm,
        specialtyId: doctor.specialtyId
    })
  } catch (error) {
    next(error)
  }
}

export const getAll = async (req, res, next) => {
  try {
    const doctors = await doctorService.getAllDoctors()
    res.status(200).json(doctors)
  } catch (error) {
    next(error)
  }
}

export const update = async (req, res, next) => {
  try {
    const doctor = await doctorService.updateDoctor(req.params.id, req.body)
    res.status(200).json(doctor)
  } catch (error) {
    next(error)
  }
}

export const deactivate = async (req, res, next) => {
  try {
    const doctor = await doctorService.deactivateDoctor(req.params.id)
    res.status(200).json(doctor)
  } catch (error) {
    next(error)
  }
}

export const activate = async (req, res, next) => {
  try {
    const doctor = await doctorService.activateDoctor(req.params.id)
    res.status(200).json(doctor)
  } catch (error) {
    next(error)
  }
}

export default { create, getAll, update, deactivate, activate }