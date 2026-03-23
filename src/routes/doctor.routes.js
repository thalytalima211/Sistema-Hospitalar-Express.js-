import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createDoctorSchema, updateDoctorSchema } from "../validations/doctor.validation.js";
import doctorController from "../controllers/doctor.controller.js";

const router = Router();

/**
 * @swagger
 * /register-doctor:
 *   post:
 *     summary: Cadastrar um novo médico
 *     tags: [Doctors]
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
 *               phone:
 *                 type: string
 *               crm:
 *                 type: string
 *               specialtyId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Médico criado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               id: "69bd4277d1647e11f1d0e168"
 *               name: "Pedro Augusto"
 *               email: "pedro@email.com"
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
router.post('/register-doctor',
    authMiddleware,
    roleMiddleware("ADMIN"),
    validate(createDoctorSchema),
    doctorController.create.bind(doctorController)
)

/**
 * @swagger
 * /doctors:
 *   get:
 *     summary: Listar todos os médicos
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de médicos
 *         content:
 *           application/json:
 *             example:
 *               [
 *                 {
 *                   id: "69bd4277d1647e11f1d0e168",
 *                   name: "Pedro Augusto",
 *                   email: "pedro@medico.com",
 *                   specialty: "Ortopedia",
 *                   phone: "88999999999",
 *                   crm: "1314612345"
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
router.get('/doctors',
    authMiddleware,
    roleMiddleware("ADMIN", "RECEPTIONIST"),
    doctorController.getAll.bind(doctorController)
)

/**
 * @swagger
 * /doctors/{id}:
 *   put:
 *     summary: Atualizar dados de um médico
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               specialtyId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Médico atualizado
 *         content:
 *           application/json:
 *             example:
 *               id: "69bd4277d1647e11f1d0e168"
 *               phone: "88998877665"
 *               crm: "1234568790"
 *               active: true
 *               specialtyId: "69bd3ad8dc1eb18a0e1c3f38"
 *               userId: "69c090681d5a7b34aeaf57af"
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
 *         description: Médico não encontrado
 *         content:
 *           application/json:
 *             example:
 *               {
 *                  "success": false,
 *                  "message": "Médico não encontrado"
 *               }
 */
router.put('/doctors/:id',
    authMiddleware,
    roleMiddleware("ADMIN"),
    validate(updateDoctorSchema),
    doctorController.update.bind(doctorController)
)

/**
 * @swagger
 * /doctors/{id}/deactivate:
 *   put:
 *     summary: Desativar um médico
 *     tags: [Doctors]
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
 *         description: Médico desativado
 *         content:
 *           application/json:
 *             example:
 *               {
 *                  "id": "69c090681d5a7b34aeaf57b0",
 *                  "phone": "1234567890",
 *                  "crm": "1234568790",
 *                  "active": false,
 *                  "specialtyId": "69bd3ad8dc1eb18a0e1c3f38",
 *                  "userId": "69c090681d5a7b34aeaf57af"
 *              }
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
 *         description: Médico não encontrado
 *         content:
 *           application/json:
 *             example:
 *               {
 *                  "success": false,
 *                  "message": "Médico não encontrado"
 *               }
 */
router.put('/doctors/:id/deactivate',
    authMiddleware,
    roleMiddleware("ADMIN"),
    doctorController.deactivate.bind(doctorController)
)

/**
 * @swagger
 * /doctors/{id}/activate:
 *   put:
 *     summary: Ativar um médico
 *     tags: [Doctors]
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
 *         description: Médico ativado
 *         content:
 *           application/json:
 *             example:
 *                  {
 *                      "id": "69c090681d5a7b34aeaf57b0",
 *                      "phone": "1234567890",
 *                      "crm": "1234568790",
 *                      "active": true,
 *                      "specialtyId": "69bd3ad8dc1eb18a0e1c3f38",
 *                      "userId": "69c090681d5a7b34aeaf57af"
 *                  }
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
 *         description: Médico não encontrado
 *         content:
 *           application/json:
 *             example:
 *               {
 *                  "success": false,
 *                  "message": "Médico não encontrado"
 *               }
 */
router.put('/doctors/:id/activate',
    authMiddleware,
    roleMiddleware("ADMIN"),
    doctorController.activate.bind(doctorController)
)

/**
 * @swagger
 * /doctors/{id}:
 *   get:
 *     summary: Obter detalhes de um médico
 *     tags: [Doctors]
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
 *         description: Detalhes do médico
 *         content:
 *           application/json:
 *             example:
 *               {
 *                   "doctor": {
 *                       "id": "69bd4277d1647e11f1d0e168",
 *                       "phone": "00123456789",
 *                       "crm": "1314612345",
 *                       "active": true,
 *                       "specialtyId": "69bd3ad8dc1eb18a0e1c3f38",
 *                       "userId": "69bd4277d1647e11f1d0e167"
 *                   },
 *                   "appointments": {
 *                       "scheduled": [
 *                           {
 *                               "id": "69c08c9e4668be19a6da72ba",
 *                               "startTime": "2023-04-10T15:00:00.000Z",
 *                               "duration": 60,
 *                               "patientId": "69a63ee6b6573471368c591e",
 *                               "patientName": "Thalyta Lima",
 *                               "patientPhone": "88993042194"
 *                           }
 *                       ],
 *                       "completed": [
 *                           {
 *                               "id": "69c083a0ade8c06f11b6bbc9",
 *                               "startTime": "2023-04-10T13:00:00.000Z",
 *                               "duration": 60,
 *                               "patientId": "69a63ee6b6573471368c591e",
 *                               "medicalRecord": {
 *                                   "id": "69c08b819c61ae3d4ab91154",
 *                                   "diagnosis": "Gripe respiratória",
 *                                   "prescription": "Paracetamol 500mg, 3x ao dia por 5 dias",
 *                                   "notes": null,
 *                                   "createdAt": "2026-03-23T00:38:25.346Z",
 *                                   "appointmentId": "69c083a0ade8c06f11b6bbc9"
 *                               },
 *                               "patientName": "Thalyta Lima",
 *                               "patientPhone": "88993042194"
 *                           }
 *                       ],
 *                       "canceled": [
 *                           {
 *                               "id": "69c07ed802c9d53c6d15c61a",
 *                               "startTime": "2023-04-10T10:00:00.000Z",
 *                               "duration": 60,
 *                               "patientId": "69a63ee6b6573471368c591e",
 *                               "patientName": "Thalyta Lima",
 *                               "patientPhone": "88993042194"
 *                           }
 *                       ]
 *                   }
 *               }
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
 *         description: Médico não encontrado
 *         content:
 *           application/json:
 *             example:
 *               {
 *                  "success": false,
 *                  "message": "Médico não encontrado"
 *               }
 */
router.get('/doctors/:id',
    authMiddleware,
    roleMiddleware("ADMIN", "RECEPTIONIST", "DOCTOR"),
    doctorController.getDetails.bind(doctorController)
)

export default router;