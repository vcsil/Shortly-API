import { Router } from "express";

import validateSchema from "../middlewares/schemaValidator.js";
import authEmailValidation from "../middlewares/authEmailValidatonMiddleware.js";
import { signUp, singIn } from "../controllers/authController.js";
import userSignUpSchema from "../Schemas/userSchema.js";
import loginSchema from "../Schemas/logninSchema.js";

const authRouter = Router();

authRouter.post(
    "/signup",
    validateSchema(userSignUpSchema),
    authEmailValidation,
    signUp
);
authRouter.post("/signin", validateSchema(loginSchema), singIn);

export default authRouter;
