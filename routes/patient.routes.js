import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createPatientSchema } from "../validations/patient.validation.js";
import patientController from "../controllers/patient.controller.js";

const router = Router();

router.post('/register-patient',
    authMiddleware,
    roleMiddleware("ADMIN", "RECEPTIONIST"),
    validate(createPatientSchema),
    patientController.create.bind(patientController)
);

export default router;