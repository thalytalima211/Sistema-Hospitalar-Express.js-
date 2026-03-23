import { z } from "zod";

export const createDoctorSchema = z.object({
    name: z.string({error: (issue) => issue.input === undefined && "Nome é obrigatório" })
    .min(3, "Nome deve conter pelo menos 3 caracteres"),
    email: z.string({error: (issue) => issue.input === undefined && "Email é obrigatório" })
    .email("Email inválido"),
    password: z.string({error: (issue) => issue.input === undefined && "Senha é obrigatória" })
    .min(6, "Senha deve conter pelo menos 6 caracteres"),
    phone: z.string({error: (issue) => issue.input === undefined && "Telefone é obrigatório" })
    .min(10, "Telefone deve conter pelo menos 10 caracteres"),
    crm: z.string({error: (issue) => issue.input === undefined && "CRM é obrigatório" })
    .min(10, "CRM deve conter pelo menos 10 caracteres"),
    specialtyId: z.string({error: (issue) => issue.input === undefined && "Especialidade é obrigatória" })
});

export const updateDoctorSchema = createDoctorSchema
    .omit({
        email: true,
        password: true,
        crm: true
    }).partial().strict()