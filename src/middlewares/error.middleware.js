import { ZodError } from "zod";
import AppError from "../utils/AppError.js";

export function errorMiddleware(error, req, res, next) {
  if (error instanceof ZodError) {
    const formattedErrors = {};

    for (const issue of error.issues) {
      const field = issue.path?.[0] ?? "unknown";
      formattedErrors[field] = issue.message;
    }

    return res.status(400).json({
      success: false,
      message: "Erro de validação",
      errors: formattedErrors,
    });
  }

  if (error.code === "P2023") {
    return res.status(400).json({
      success: false,
      message: "ID inválido"
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  console.error(error);

  return res.status(500).json({
    success: false,
    message: "Erro interno do servidor",
  });
}

export default errorMiddleware;