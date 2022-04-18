import { Router } from "express";
import * as rechargeController from "../controllers/rechargeController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { rechargeInsertSchema } from "../schemas/rechargeSchemas.js";

const cardRouter = Router();

cardRouter.post(
  "/recharges",
  validateSchemaMiddleware(rechargeInsertSchema),
  rechargeController.insertRecharge
);

export default cardRouter;
