import { Router } from "express";
import * as cardController from "../controllers/cardController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { cardInsertSchema, cardActivateSchema } from "../schemas/cardSchemas.js";

const cardRouter = Router();

cardRouter.post(
  "/cards",
  validateSchemaMiddleware(cardInsertSchema),
  cardController.createCard
);

cardRouter.put(
  "/cards/:id/activate",
  validateSchemaMiddleware(cardActivateSchema),
  cardController.activateCard
);

cardRouter.get(
  "/cards/:id/balance",
  cardController.getBalance
);

cardRouter.put(
  "/cards/:id/block",
  cardController.blockCard
);

cardRouter.put(
  "/cards/:id/unblock",
  cardController.unblockCard
);

export default cardRouter;
