import * as employeeRepository from "../repositories/employeeRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
import { notFoundError, conflictError } from "../middlewares/errorHandlerMiddleware.js";

async function findById(id: number) {
  const employee = await employeeRepository.findById(id);
  if (!employee) {
    throw notFoundError(`there's not any employee registered with the id ${id}`);
  }
  return employee;
}

export async function ensureEmployeeDoesExist(id: number) {
  return findById(id)
}
