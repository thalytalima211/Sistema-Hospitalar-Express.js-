import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string({error: (issue) => issue.input === undefined && "Nome é obrigatório" }).min(3, "Nome deve conter pelo menos 3 caracteres"),
  email: z.string({error: (issue) => issue.input === undefined && "Email é obrigatório" }).email("Email inválido"),
  password: z.string({error: (issue) => issue.input === undefined && "Senha é obrigatória" }).min(6, "Senha deve conter pelo menos 6 caracteres"),
  role: z.enum(["ADMIN", "DOCTOR", "RECEPTIONIST"], {error: (issue) => issue.input === undefined && "Função é obrigatória"}),
});