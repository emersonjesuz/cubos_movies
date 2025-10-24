import cors from "cors";
import express from "express";
import { AuthController } from "./auth/AuthController";
import { MovieController } from "./movies/MovieController";
import { authMiddleware } from "./shared/middleware/AuthMiddleware";
import { ErrorHandler } from "./shared/middleware/ErrorHandler";

const app = express();
const authController = new AuthController();
const handlerError = new ErrorHandler();
const movieController = new MovieController();

app.use(cors());
app.use(express.json());

app.post("/auth/register", (req, res) => authController.register(req, res));
app.post("/auth/login", (req, res) => authController.login(req, res));
app.use(authMiddleware);
app.post("/movie", (req, res) => movieController.create(req, res));
app.put("/movie/:id", (req, res) => movieController.update(req, res));
app.use(handlerError.process);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
