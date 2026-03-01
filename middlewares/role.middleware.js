import AppError from "../utils/AppError.js";

export function roleMiddleware(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(new AppError("Acesso negado", 403));
    }

    next();
  };
}