import appointmentService from "../services/appointment.service.js";

export const create = async (req, res, next) => {
  try {
    const appointment = await appointmentService.createAppointment(req.body)
    res.status(201).json(appointment)
  } catch (error) {
    next(error)
  }
}

export default { create }