import appointmentService from "../services/appointment.service.js";

export const create = async (req, res, next) => {
  try {
    const appointment = await appointmentService.createAppointment(req.body)
    res.status(201).json(appointment)
  } catch (error) {
    next(error)
  }
}

export const getAll = async (req, res, next) => {
  try {
    const appointments = await appointmentService.getAllAppointments()
    res.status(200).json(appointments)
  } catch (error) {
    next(error)
  }
}

export const cancel = async (req, res, next) => {
  try {
    const appointment = await appointmentService.cancelAppointment(req.params.id)
    res.status(200).json(appointment)
  } catch (error) {
    next(error)
  }
}

export const complete = async (req, res, next) => {
  try {
    const appointment = await appointmentService.completeAppointment(req.params.id, req.body)
    res.status(200).json(appointment)
  } catch (error) {
    next(error)
  }
}

export const reschedule = async (req, res, next) => {
  try {
    const appointment = await appointmentService.rescheduleAppointment(req.params.id, req.body)
    res.status(200).json(appointment)
  } catch (error) {
    next(error)
  }
}

export default { create, getAll, cancel, complete, reschedule }