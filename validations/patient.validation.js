import {z} from "zod";

function isValidCPF(cpf) {
  const cleaned = cpf.replace(/\D/g, "");

  if (cleaned.length !== 11 || /^(\d)\1+$/.test(cleaned)) {
    return false;
  }

  const calcCheckDigit = (base, factor) => {
    let total = 0;
    for (let i = 0; i < base.length; i++) {
      total += parseInt(base[i]) * (factor - i);
    }
    const remainder = total % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const digit1 = calcCheckDigit(cleaned.substring(0, 9), 10);
  const digit2 = calcCheckDigit(cleaned.substring(0, 10), 11);

  return digit1 === parseInt(cleaned[9]) && digit2 === parseInt(cleaned[10]);
}

export const createPatientSchema = z.object({
    name: z.string().min(3, "Nome deve conter pelo menos 3 caracteres"),
    email: z.string().email("Email inválido"),
    cpf: z
        .string()
        .transform((val) => val.replace(/\D/g, ""))
        .refine((val) => isValidCPF(val), {
        message: "CPF inválido",
        }),

    phone: z
        .string()
        .regex(
        /^(\+55\s?)?(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/,
        "Telefone inválido"
        ),
    address: z.string().min(5, "Endereço deve conter pelo menos 5 caracteres"),
});