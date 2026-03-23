import express from "express";
import errorMiddleware from "./src/middlewares/error.middleware.js";
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import patientRoutes from "./src/routes/patient.routes.js";
import specialtyRoutes from "./src/routes/specialty.routes.js";
import doctorRoutes from "./src/routes/doctor.routes.js";
import appointmentRoutes from "./src/routes/appointment.routes.js";
import { setupSwagger } from "./swagger.js";

const app = express();
setupSwagger(app)

app.use(express.json());
app.use('', authRoutes);
app.use('', userRoutes);
app.use('', patientRoutes);
app.use('', specialtyRoutes);
app.use('', doctorRoutes);
app.use('', appointmentRoutes);
app.use(errorMiddleware);

export default app;