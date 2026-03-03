import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3, "Nome deve conter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve conter pelo menos 6 caracteres"),
  role: z.enum(["ADMIN", "DOCTOR", "RECEPTIONIST"], "Função deve ser ADMIN, DOCTOR ou RECEPTIONIST"),
});