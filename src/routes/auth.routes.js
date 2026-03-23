import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { loginSchema } from "../validations/auth.validation.js";
const router = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realizar login na API
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               {
 *                  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTQ3ZjMzOTg1YjU1MWJjNjc0ZmY2NCIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc3NDIyNjk5NywiZXhwIjoxNzc0MzEzMzk3fQ.MrGOE0qm_38PAsqa6PUr3Rtz0kgIImaYGhOFYaFaBLA",
 *                  "user": {
 *                      "id": "69a47f33985b551bc674ff64",
 *                      "name": "Administrador",
 *                      "role": "ADMIN"
 *                  }
 *              }
 *       400:
 *         description: Email e senha são obrigatórios
 *         content:
 *           application/json:
 *             example:
 *               sucess: false
 *               message: "Erro de validação"
 *               errors: []
 *       401:
 *         description: Acesso negado
 *         content:
 *           application/json:
 *             example:
 *                  "message": "Credenciais inválidas. Verifique suas credenciais e tente novamente."
 */
router.post('/login',
    validate(loginSchema),
    authController.login.bind(authController)
)

export default router;