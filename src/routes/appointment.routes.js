import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createAppointmentSchema, rescheduleAppointmentSchema } from "../validations/appointment.validation.js";
import { createMedicalRecordSchema } from '../validations/medicalRecord.validation.js'
import appointmentController from "../controllers/appointment.controller.js";

const router = Router();

/**
 * @swagger
 * /register-appointment:
 *   post:
 *     summary: Criar um novo agendamento
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: string
 *               doctorId:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               duration:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Agendamento criado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               id: "69c083a0ade8c06f11b6bbc9"
 *               startTime: "2023-04-10T13:00:00.000Z"
 *               status: "SCHEDULED"
 *               duration: 60
 *               patientId: "69a63ee6b6573471368c591e"
 *               doctorId: "69bd4277d1647e11f1d0e168"
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             example:
 *               sucess: false
 *               message: "Erro de validação"
 *               errors: []
 *       401:
 *         description: Usuário não logado
 *         content:
 *           application/json:
 *             example:
 *               sucess: false
 *               message: "Token não fornecido"
 *               errors: []
 *       403:
 *         description: Acesso negado
 *         content:
 *           application/json:
 *             example:
 *               sucess: false
 *               message: "Acesso negado"
 */
router.post("/register-appointment", 
    authMiddleware, 
    roleMiddleware("ADMIN", "RECEPTIONIST"), 
    validate(createAppointmentSchema), 
    appointmentController.create);

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Listar todos os agendamentos
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de agendamentos
 *         content:
 *           application/json:
 *             example:
 *                  {
 *                  "scheduled": [
 *                      {
 *                          "id": "69c07ed802c9d53c6d15c61a",
 *                          "duration": 60,
 *                          "patientId": "69a63ee6b6573471368c591e",
 *                          "doctor": {
 *                              "id": "69bd4277d1647e11f1d0e168",
 *                              "phone": "00123456789",
 *                              "crm": "1314612345",
 *                              "specialtyId": "69bd3ad8dc1eb18a0e1c3f38",
 *                              "name": "Pedro Augusto",
 *                              "specialtyName": "Ortopedia"
 *                          },
 *                          "date": "10/04/2023",
 *                          "time": "07:00",
 *                          "patientName": "Thalyta Lima",
 *                          "patientPhone": "88993042194"
 *                      }
 *                  ],
 *                  "completed": [
 *                      {
 *                          "id": "69bdad7b178d140effa1d6ad",
 *                          "duration": 60,
 *                          "patientId": "69a63ee6b6573471368c591e",
 *                          "doctor": {
 *                              "id": "69bd4277d1647e11f1d0e168",
 *                              "phone": "00123456789",
 *                              "crm": "1314612345",
 *                              "specialtyId": "69bd3ad8dc1eb18a0e1c3f38",
 *                              "name": "Pedro Augusto",
 *                              "specialtyName": "Ortopedia"
 *                          },
 *                          "date": "21/03/2026",
 *                          "time": "14:30",
 *                          "patientName": "Thalyta Lima",
 *                          "patientPhone": "88993042194"
 *                      }
 *                  ]
 *              }
 *       401:
 *         description: Usuário não logado
 *         content:
 *           application/json:
 *             example:
 *               sucess: false
 *               message: "Token não fornecido"
 *               errors: []
 *       403:
 *         description: Acesso negado
 *         content:
 *           application/json:
 *             example:
 *               sucess: false
 *               message: "Acesso negado"
 */
router.get("/appointments", 
    authMiddleware, 
    roleMiddleware("ADMIN", "RECEPTIONIST"), 
    appointmentController.getAll);

/**
 * @swagger
 * /appointments/{id}/cancel:
 *   put:
 *     summary: Cancelar um agendamento
 *     tags: [Appointments]
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
 *         description: Agendamento cancelado
 *         content:
 *           application/json:
 *             example:
 *               {
 *                  "id": "69c07ed802c9d53c6d15c61a",
 *                  "startTime": "2023-04-10T10:00:00.000Z",
 *                  "status": "CANCELED",
 *                  "duration": 60,
 *                  "patientId": "69a63ee6b6573471368c591e",
 *                  "doctorId": "69bd4277d1647e11f1d0e168"
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
 *         description: Agendamento não encontrado
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Consulta não encontrada"
 */
router.put("/appointments/:id/cancel", 
    authMiddleware, 
    roleMiddleware("ADMIN", "RECEPTIONIST", "DOCTOR"),
    appointmentController.cancel);

/**
 * @swagger
 * /appointments/{id}/complete:
 *   put:
 *     summary: Finalizar consulta e criar prontuário
 *     tags: [Appointments]
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
 *               diagnosis:
 *                 type: string
 *               prescription:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Consulta finalizada com sucesso
 *         content:
 *           application/json:
 *             example:
 *               {
 *                  "medicalRecord": {
 *                      "id": "69c08b819c61ae3d4ab91154",
 *                      "diagnosis": "Gripe respiratória",
 *                      "prescription": "Paracetamol 500mg, 3x ao dia por 5 dias",
 *                      "notes": null,
 *                      "createdAt": "2026-03-23T00:38:25.346Z",
 *                      "appointmentId": "69c083a0ade8c06f11b6bbc9"
 *                  },
 *                  "appointment": {
 *                      "id": "69c083a0ade8c06f11b6bbc9",
 *                      "startTime": "2023-04-10T13:00:00.000Z",
 *                      "status": "COMPLETED",
 *                      "duration": 60,
 *                      "patientId": "69a63ee6b6573471368c591e",
 *                      "doctorId": "69bd4277d1647e11f1d0e168"
 *                  }
 *              }
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             example:
 *               message: "ID inválido"
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
 *         description: Agendamento não encontrado
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Consulta não encontrada"
 */
router.put("/appointments/:id/complete", 
    authMiddleware, 
    roleMiddleware("ADMIN", "DOCTOR"), 
    validate(createMedicalRecordSchema),
    appointmentController.complete);

/**
 * @swagger
 * /appointments/{id}/reschedule:
 *   put:
 *     summary: Reagendar um agendamento
 *     tags: [Appointments]
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
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               duration:
 *                  type: integer
 *     responses:
 *       200:
 *         description: Agendamento reagendado
 *         content:
 *           application/json:
 *             example:
 *               {
 *                  "id": "69c08c9e4668be19a6da72ba",
 *                  "startTime": "2023-04-10T15:00:00.000Z",
 *                  "status": "SCHEDULED",
 *                  "duration": 60,
 *                  "patientId": "69a63ee6b6573471368c591e",
 *                  "doctorId": "69bd4277d1647e11f1d0e168"
 *              }
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             example:
 *               sucess: false
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
 *         description: Agendamento não encontrado
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Consulta não encontrada"
 */
router.put("/appointments/:id/reschedule", 
    authMiddleware, 
    roleMiddleware("ADMIN", "RECEPTIONIST"), 
    validate(rescheduleAppointmentSchema), 
    appointmentController.reschedule);

export default router;