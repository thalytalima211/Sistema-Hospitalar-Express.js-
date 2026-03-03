import express from "express";
import errorMiddleware from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import patientRoutes from "./routes/patient.routes.js";

const app = express();

app.use(express.json());
app.use('', authRoutes);
app.use('', userRoutes);
app.use('', patientRoutes);
app.use(errorMiddleware);

export default app;