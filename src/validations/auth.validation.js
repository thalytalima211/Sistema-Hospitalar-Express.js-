import { z } from "zod"

export const loginSchema = z.object({
  email: z.string({error: (issue) => issue.input === undefined && "Email é obrigatório" })
    .email("Email inválido"),
  password: z.string({error: (issue) => issue.input === undefined && "Senha é obrigatória" })
    .min(6, "Senha deve conter pelo menos 6 caracteres")
});