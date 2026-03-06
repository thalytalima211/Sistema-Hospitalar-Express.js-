import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createDoctorSchema } from "../validations/doctor.validation.js";
import doctorController from "../controllers/doctor.controller.js";

const router = Router();

router.post('/register-doctor',
    authMiddleware,
    roleMiddleware("ADMIN"),
    validate(createDoctorSchema),
    doctorController.create.bind(doctorController)
)

export default router;