import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createspecialtySchema } from "../validations/specialty.validation.js";
import specialtyController from "../controllers/specialty.controller.js";

const router = new Router();

router.post('/register-specialty',
  authMiddleware,
  roleMiddleware("ADMIN"),
  validate(createspecialtySchema),
    specialtyController.create.bind(specialtyController)  
)

router.get('/specialities',
  authMiddleware,
  roleMiddleware("ADMIN", "RECEPTIONIST"),
  specialtyController.getAll.bind(specialtyController)  
)

export default router;