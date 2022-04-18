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

export const cardUpdateSchema = joi.object({
  fullName: joi.string(),
  birthDate: joi.date(),
  position: joi.string(),
  grossSalary: joi.number(),
});
