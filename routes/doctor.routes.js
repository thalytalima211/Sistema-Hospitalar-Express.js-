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

router.get('/doctors',
    authMiddleware,
    roleMiddleware("ADMIN", "RECEPTIONIST"),
    doctorController.getAll.bind(doctorController)
)

router.put('/doctors/:id',
    authMiddleware,
    roleMiddleware("ADMIN"),
    doctorController.update.bind(doctorController)
)

router.put('/doctors/:id/deactivate',
    authMiddleware,
    roleMiddleware("ADMIN"),
    doctorController.deactivate.bind(doctorController)
)

router.put('/doctors/:id/activate',
    authMiddleware,
    roleMiddleware("ADMIN"),
    doctorController.activate.bind(doctorController)
)

router.get('/doctors/:id',
    authMiddleware,
    roleMiddleware("ADMIN", "RECEPCIONIST", "DOCTOR"),
    doctorController.getDetails.bind(doctorController)
)

export default router;