import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createspecialtySchema } from "../validations/specialty.validation.js";
import specialtyController from "../controllers/specialty.controller.js";

const router = new Router();

/**
 * @swagger
 * /register-specialty:
 *   post:
 *     summary: Cadastrar uma nova especialidade médica
 *     tags: [Specialties]
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
 *     responses:
 *       201:
 *         description: Especialidade criada com sucesso
 *         content:
 *           application/json:
 *             example:
 *               id: "69bd3ad8dc1eb18a0e1c3f38"
 *               name: "Ortopedia"
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Erro de validação"
 *               errors: []
 *       401:
 *         description: Usuário não logado
 *         content:
 *           application/json:
 *             example:
 *               sucess: false
 *               message: "Token não fornecido"
 *       403:
 *         description: Acesso negado
 *         content:
 *           application/json:
 *             example:
 *               sucess: false
 *               message: "Acesso negado"
 */
router.post('/register-specialty',
  authMiddleware,
  roleMiddleware("ADMIN"),
  validate(createspecialtySchema),
    specialtyController.create.bind(specialtyController)  
)

/**
 * @swagger
 * /specialties:
 *   get:
 *     summary: Listar todas as especialidades
 *     tags: [Specialties]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de especialidades
 *         content:
 *           application/json:
 *             example:
 *               [
 *                 {
 *                   id: "69bd3ad8dc1eb18a0e1c3f38",
 *                   name: "Ortopedia"
 *                 },
 *                 {
 *                   id: "69bd3ad8dc1eb18a0e1c3f39",
 *                   name: "Cardiologia"
 *                 }
 *               ]
 *       401:
 *         description: Usuário não logado
 *         content:
 *           application/json:
 *             example:
 *               sucess: false
 *               message: "Token não fornecido"
 *       403:
 *         description: Acesso negado
 *         content:
 *           application/json:
 *             example:
 *               sucess: false
 *               message: "Acesso negado"
 */
router.get('/specialties',
  authMiddleware,
  roleMiddleware("ADMIN", "RECEPTIONIST"),
  specialtyController.getAll.bind(specialtyController)  
)

/**
 * @swagger
 * /specialties/{id}:
 *   put:
 *     summary: Atualizar uma especialidade
 *     tags: [Specialties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Especialidade atualizada
 *         content:
 *           application/json:
 *             example:
 *               id: "69bd3ad8dc1eb18a0e1c3f38"
 *               name: "Ortopedia Avançada"
 *       400:
 *         description: ID inválido ou dados inválidos
 *       401:
 *         description: Usuário não logado
 *         content:
 *           application/json:
 *             example:
 *               sucess: false
 *               message: "Token não fornecido"
 *       403:
 *         description: Acesso negado
 *         content:
 *           application/json:
 *             example:
 *               sucess: false
 *               message: "Acesso negado"
 *       404:
 *         description: Especialidade não encontrada
 *         content:
 *           application/json:
 *             example:
 *               {
 *                   "success": false,
 *                   "message": "Especialidade não encontrada"
 *               }
 */
router.put('/specialties/:id',
  authMiddleware,
  roleMiddleware("ADMIN"),
  specialtyController.update.bind(specialtyController)  
)

/**
 * @swagger
 * /specialties/{id}:
 *   get:
 *     summary: Obter detalhes de uma especialidade
 *     tags: [Specialties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalhes da especialidade
 *         content:
 *           application/json:
 *             example:
 *                 {
 *                     "specialty": {
 *                         "id": "69bd3ad8dc1eb18a0e1c3f38",
 *                         "name": "Ortopedia"
 *                     },
 *                     "doctors": [
 *                         {
 *                             "id": "69bd4277d1647e11f1d0e168",
 *                             "phone": "00123456789",
 *                             "crm": "1314612345",
 *                             "active": true,
 *                             "doctorName": "Pedro Augusto"
 *                         }
 *                     ]
 *                 }
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "ID inválido"
 *       401:
 *         description: Usuário não logado
 *         content:
 *           application/json:
 *             example:
 *               sucess: false
 *               message: "Token não fornecido"
 *       403:
 *         description: Acesso negado
 *         content:
 *           application/json:
 *             example:
 *               sucess: false
 *               message: "Acesso negado"
 *       404:
 *         description: Especialidade não encontrada
 *         content:
 *           application/json:
 *             example:
 *               {
 *                   "success": false,
 *                   "message": "Especialidade não encontrada"
 *               }
 */
router.get('/specialties/:id',
  authMiddleware,
  roleMiddleware("ADMIN", "RECEPTIONIST"),
  specialtyController.getDetails.bind(specialtyController)
)

export default router;