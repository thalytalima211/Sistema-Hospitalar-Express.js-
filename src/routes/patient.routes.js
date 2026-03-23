import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createPatientSchema, updatePatientSchema } from "../validations/patient.validation.js";
import patientController from "../controllers/patient.controller.js";

const router = Router();

/**
 * @swagger
 * /register-patient:
 *   post:
 *     summary: Cadastrar um novo paciente
 *     tags: [Patients]
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
 *               cpf:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Paciente criado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               {
 *                   "id": "69c09648be8fd67f89ec02d6",
 *                   "name": "John Doe",
 *                   "email": "john.doe@example.com",
 *                   "cpf": "80310434009",
 *                   "phone": "1234567890",
 *                   "address": "123 Main St"
 *               }
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
router.post('/register-patient',
    authMiddleware,
    roleMiddleware("ADMIN", "RECEPTIONIST"),
    validate(createPatientSchema),
    patientController.create.bind(patientController)
);

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Listar todos os pacientes
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pacientes
 *         content:
 *           application/json:
 *             example:
 *               [
 *                   {
 *                       "id": "69a63ee6b6573471368c591e",
 *                       "name": "Thalyta Lima",
 *                       "email": "thalyta@paciente.com",
 *                       "cpf": "064.693.700-63",
 *                       "phone": "88993042194",
 *                       "address": "Tianguá-CE"
 *                   }
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
router.get('/patients',
    authMiddleware,
    roleMiddleware("ADMIN", "RECEPTIONIST"),
    patientController.getAll.bind(patientController)
);

/**
 * @swagger
 * /patients/{id}:
 *   put:
 *     summary: Atualizar dados de um paciente
 *     tags: [Patients]
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
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Paciente atualizado
 *         content:
 *           application/json:
 *             example:
 *                   {
 *                       "id": "69c09648be8fd67f89ec02d6",
 *                       "name": "John Doe",
 *                       "email": "john.doe@example.com",
 *                       "cpf": "80310434009",
 *                       "phone": "1234567890",
 *                       "address": "123 Main St"
 *                   }
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
 *       404:
 *         description: Paciente não encontrado
 *         content:
 *           application/json:
 *             example:
 *                   {
 *                       "success": false,
 *                       "message": "Paciente não encontrado"
 *                   }
 */
router.put('/patients/:id',
    authMiddleware,
    roleMiddleware("ADMIN", "RECEPTIONIST"),
    validate(updatePatientSchema),
    patientController.update.bind(patientController)
);

/**
 * @swagger
 * /patients/{id}:
 *   get:
 *     summary: Obter detalhes de um paciente
 *     tags: [Patients]
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
 *         description: Detalhes do paciente
 *         content:
 *           application/json:
 *             example:
 *                   {
 *                       "patient": {
 *                           "id": "69a63ee6b6573471368c591e",
 *                           "name": "Thalyta Lima",
 *                           "email": "thalyta@paciente.com",
 *                           "cpf": "064.693.700-63",
 *                           "phone": "88993042194",
 *                           "address": "Tianguá-CE"
 *                       },
 *                       "appointments": {
 *                           "scheduled": [
 *                               {
 *                                   "id": "69c08c9e4668be19a6da72ba",
 *                                   "startTime": "2023-04-10T15:00:00.000Z",
 *                                   "duration": 60,
 *                                   "doctorId": "69bd4277d1647e11f1d0e168",
 *                                   "doctorName": "Pedro Augusto",
 *                                   "doctorPhone": "00123456789"
 *                               }
 *                           ],
 *                           "completed": [
 *                               {
 *                                   "id": "69c083a0ade8c06f11b6bbc9",
 *                                   "startTime": "2023-04-10T13:00:00.000Z",
 *                                   "duration": 60,
 *                                   "doctorId": "69bd4277d1647e11f1d0e168",
 *                                   "medicalRecord": {
 *                                       "id": "69c08b819c61ae3d4ab91154",
 *                                       "diagnosis": "Gripe respiratória",
 *                                       "prescription": "Paracetamol 500mg, 3x ao dia por 5 dias",
 *                                       "notes": null,
 *                                       "createdAt": "2026-03-23T00:38:25.346Z",
 *                                       "appointmentId": "69c083a0ade8c06f11b6bbc9"
 *                                   },
 *                                   "doctorName": "Pedro Augusto",
 *                                   "doctorPhone": "00123456789"
 *                               }
 *                           ],
 *                           "canceled": [
 *                               {
 *                                   "id": "69bdadc3763c3103a44745ec",
 *                                   "startTime": "2026-03-21T16:00:00.000Z",
 *                                   "duration": 60,
 *                                   "doctorId": "69bd4277d1647e11f1d0e168",
 *                                   "doctorName": "Pedro Augusto",
 *                                   "doctorPhone": "00123456789"
 *                               }
 *                           ]
 *                       }
 *                   }
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
 *         description: Paciente não encontrado
 *         content:
 *           application/json:
 *             example:
 *                   {
 *                       "success": false,
 *                       "message": "Paciente não encontrado"
 *                   }
 */
router.get('/patients/:id',
    authMiddleware,
    roleMiddleware("ADMIN", "RECEPTIONIST", "DOCTOR"),
    patientController.getDetails.bind(patientController)
)

export default router;