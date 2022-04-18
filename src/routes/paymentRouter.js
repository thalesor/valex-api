import { Router } from "express";
import * as paymentController from "../controllers/paymentController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { paymentInsertSchema } from "../schemas/paymentSchemas.js";

const paymentRouter = Router();

paymentRouter.post(
  "/payments",
  validateSchemaMiddleware(paymentInsertSchema),
  paymentController.insertPosPayment
);

export default paymentRouter;
