import express from "express";
import cors from "cors";
import { AuthController } from "./auth/AuthController";
import { ErrorHandler } from "./shared/middleware/ErrorHandler";

const app = express();
const authController = new AuthController();
const handlerError = new ErrorHandler();

app.use(cors());
app.use(express.json());

app.post("/auth/register", (req, res) => authController.register(req, res));
app.post("/auth/login", (req, res) => authController.login(req, res));

app.use(handlerError.process);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
