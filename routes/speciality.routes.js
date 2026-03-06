import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createSpecialitySchema } from "../validations/speciality.validation.js";
import specialityController from "../controllers/speciality.controller.js";

const router = new Router();

router.post('/register-speciality',
  authMiddleware,
  roleMiddleware("ADMIN"),
  validate(createSpecialitySchema),
    specialityController.create.bind(specialityController)  
)

export default router;