import { Router } from "express";
import { shortenURL, getURLById } from "../controllers/urlsController.js";

import validateSchema from "../middlewares/schemaValidator.js";
import validateToken from "../middlewares/validateToken.js";
import urlsShortenSchema from "../Schemas/urlsShortenSchema.js";

const urlsRouter = Router();

urlsRouter.post(
    "/urls/shorten",
    validateSchema(urlsShortenSchema),
    validateToken,
    shortenURL
);
urlsRouter.get("/urls/:id", getURLById);