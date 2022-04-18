import joi from "joi";

export const rechargeInsertSchema = joi.object({
  cardId: joi.number().required(),
  amount: joi.number().positive().required()
});

