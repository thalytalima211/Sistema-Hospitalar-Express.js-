import express from "express";
import errorMiddleware from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import patientRoutes from "./routes/patient.routes.js";
import specialtyRoutes from "./routes/specialty.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";

const app = express();

app.use(express.json());
app.use('', authRoutes);
app.use('', userRoutes);
app.use('', patientRoutes);
app.use('', specialtyRoutes);
app.use('', doctorRoutes);
app.use('', appointmentRoutes);
app.use(errorMiddleware);

export default app;