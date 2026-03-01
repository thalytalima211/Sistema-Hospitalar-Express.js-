import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createUserSchema } from "../validations/user.validation.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = Router();
const userController = new UserController()

router.post(
  "/register",
  authMiddleware,
  roleMiddleware("ADMIN"),
  validate(createUserSchema),
  userController.create.bind(userController)
);

export default router;