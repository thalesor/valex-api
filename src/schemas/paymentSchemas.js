import joi from "joi";

export const paymentInsertSchema = joi.object({
  cardId: joi.number().required(),
  businessId: joi.number().required(),
  amount: joi.number().positive().required(),
  password: joi.string().pattern(/^[0-9]{4}$/).required()
});

