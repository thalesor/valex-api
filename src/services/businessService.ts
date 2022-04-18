import * as businessRepository from "../repositories/businessRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
import { notFoundError, conflictError } from "../middlewares/errorHandlerMiddleware.js";

async function findById(id: number) {
    const business = await businessRepository.findById(id);
    if (!business) {
      throw notFoundError(`there's not any business registered with the given ID ${id}`);
    }
    return business;
}

export async function ensureBusinessDoesExist(id: number) {
  return findById(id)
}

export function ensureBusinessAndCardTypeMatch(business : businessRepository.Business,
    card : cardRepository.Card) {
    if(business.type === card.type)
    return;
    else
    throw conflictError("The business and card's type don't match");
  }

