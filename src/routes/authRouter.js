import { Router } from "express";

import userValidationSchema from "../middlewares/userValidationSchemaMiddleware.js";
import authEmailValidation from "../middlewares/authEmailValidatonMiddleware.js";
import signUp from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/signup", userValidationSchema, authEmailValidation, signUp);
authRouter.post("/signin");

export default authRouter;
