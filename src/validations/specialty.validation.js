import { z } from "zod";

export const createspecialtySchema = z.object({
  name: z.string({error: (issue) => issue.input === undefined && "Nome é obrigatório" }).trim()
  .min(3, "Nome deve conter pelo menos 3 caracteres"),
});