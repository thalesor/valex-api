import { unprocessableError } from "./errorHandlerMiddleware.js";

export function validateSchemaMiddleware(schema) {
  return (req, res, next) => {
    const validation = schema.validate(req.body);
    if (validation.error) {
      throw unprocessableError(validation.error.details[0].message);
    }

    next();
  };
}
