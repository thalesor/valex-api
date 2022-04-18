import joi from "joi";

export const cardInsertSchema = joi.object({
  employeeId: joi.number().required(),
  type: joi.string().trim().valid(
    'groceries',
    'restaurant',
    'transport',
    'education',
    'health')
}).required();

export const cardActivateSchema = joi.object({
  password: joi.string().pattern(/^[0-9]{4}$/).required(),
  ccv: joi.string().length(3).required()
});
