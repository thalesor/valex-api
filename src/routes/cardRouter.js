import { Router } from "express";
import { createCard } from "../controllers/cardController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { cardInsertSchema } from "../schemas/cardSchemas.js";

const cardRouter = Router();
//employeeRouter.get("/employees", getEmployees);
//employeeRouter.get("/employees/:id", getEmployee);
//employeeRouter.get("/employees/:id/net-salary", getEmployeeNetSalaryWithTaxes);
cardRouter.post(
  "/cards",
  validateSchemaMiddleware(cardInsertSchema),
  createCard
);
/*
employeeRouter.put(
  "/employees/:id",
  validateSchemaMiddleware(employeeUpdateSchema),
  updateEmployee
);
employeeRouter.delete("/employees/:id", deleteEmployee);
*/
export default cardRouter;
