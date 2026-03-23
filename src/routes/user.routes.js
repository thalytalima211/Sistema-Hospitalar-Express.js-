import { Router } from "express";
import userController from "../controllers/user.controller.js"; 
import { validate } from "../middlewares/validate.middleware.js";
import { createUserSchema } from "../validations/user.validation.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Cadastrar um novo usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 example: ADMIN
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               id: "69c100a1b23c4d5e6f789012"
 *               name: "Admin User"
 *               email: "admin@email.com"
 *               role: "ADMIN"
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Erro de validação"
 *               errors: []
 *       401:
 *         description: Usuário não autenticado
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Token não fornecido"
 *       403:
 *         description: Acesso negado (somente ADMIN)
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Acesso negado"
 */
router.post(
  "/register",
  authMiddleware,
  roleMiddleware("ADMIN"),
  validate(createUserSchema),
  userController.create.bind(userController)
);

export default router;