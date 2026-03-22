import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createAppointmentSchema, rescheduleAppointmentSchema } from "../validations/appointment.validation.js";
import { createMedicalRecordSchema } from '../validations/medicalRecord.validation.js'
import appointmentController from "../controllers/appointment.controller.js";

const router = Router();

router.post("/register-appointment", 
    authMiddleware, 
    roleMiddleware("ADMIN", "RECEPTIONIST"), 
    validate(createAppointmentSchema), 
    appointmentController.create);

router.get("/appointments", 
    authMiddleware, 
    roleMiddleware("ADMIN", "RECEPTIONIST"), 
    appointmentController.getAll);

router.put("/appointments/:id/cancel", 
    authMiddleware, 
    roleMiddleware("ADMIN", "RECEPTIONIST", "DOCTOR"), 
    appointmentController.cancel);

router.put("/appointments/:id/complete", 
    authMiddleware, 
    roleMiddleware("ADMIN", "DOCTOR"), 
    validate(createMedicalRecordSchema),
    appointmentController.complete);

router.put("/appointments/:id/reschedule", 
    authMiddleware, 
    roleMiddleware("ADMIN", "RECEPTIONIST"), 
    validate(rescheduleAppointmentSchema), 
    appointmentController.reschedule);

export default router;