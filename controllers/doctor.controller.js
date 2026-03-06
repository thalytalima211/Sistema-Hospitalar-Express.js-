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

export default { create }