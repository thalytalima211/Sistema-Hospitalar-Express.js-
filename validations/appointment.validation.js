import { z } from "zod";

export const createAppointmentSchema = z.object({
  startTime: z.string({error: (issue) => issue.input === undefined && "Data e hora são obrigatórias" })
    .datetime({ message: "Data e hora inválidas", offset: true }),
  duration: z.number({error: (issue) => issue.input === undefined && "Duração é obrigatória" })
    .positive("Durção deve ser um número positivo"),
  patientId: z.string({error: (issue) => issue.input === undefined && "Paciente é obrigatório" }),
  doctorId: z.string({error: (issue) => issue.input === undefined && "Médico é obrigatório" })
});

export const rescheduleAppointmentSchema = createAppointmentSchema.omit({patientId: true, doctorId: true}).partial().strict()