import * as companyRepository from "../repositories/companyRepository.js";
import { notFoundError } from "../middlewares/errorHandlerMiddleware.js";

async function findByApiKey(apiKey: string) {
    const company = await companyRepository.findByApiKey(apiKey);
    if (!company) {
      throw notFoundError(`there's not any company registered to the api-key ${apiKey}`);
    }
    return company;
}

export async function ensureCompanyDoesExist(apiKey: string) {
  return findByApiKey(apiKey)
}

