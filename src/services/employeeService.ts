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

async function findCardByTypeAndEmployee(idEmployee: number, cardType: cardRepository.TransactionTypes) {
  const card = await cardRepository.findByTypeAndEmployeeId(cardType, idEmployee);
  if(card)
  throw conflictError(`this employee can't have more than one card of type ${cardType}`);
  return card;
}

export async function ensureEmployeeDoesExist(id: number) {
  return findById(id)
}

export async function ensureEmployeeDoesntHaveCard(idEmployee: number, cardType: cardRepository.TransactionTypes) {
  return findCardByTypeAndEmployee(idEmployee, cardType);
}
