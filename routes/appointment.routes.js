import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createAppointmentSchema } from "../validations/appointment.validation.js";
import appointmentController from "../controllers/appointment.controller.js";

const router = Router();

router.post("/register-appointment", 
    authMiddleware, 
    roleMiddleware("ADMIN", "RECEPTIONIST"), 
    validate(createAppointmentSchema), 
    appointmentController.create);

export default router;