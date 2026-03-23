import { z } from 'zod'

export const createMedicalRecordSchema = z.object({
    diagnosis: z.string({ error: (issue) => issue.input === undefined && "Diagnóstico é obrigatório"})
    .min(7, "Diagnóstico deve ter no mínimo 7 caracteres"),
    prescription: z.string({ error: (issue) => issue.input === undefined && "Prescrição é obrigatória"})
    .min(7, "Prescrição deve ter no mínimo 7 caracteres")
})