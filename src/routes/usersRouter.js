import { Router } from "express";
import { getRanking, getUserById } from "../controllers/usersController.js";
import validateToken from "../middlewares/validateToken.js";

const usersRouter = Router();
usersRouter.get("/users/:id", validateToken, getUserById);
usersRouter.get("/ranking", getRanking);

export default usersRouter;
