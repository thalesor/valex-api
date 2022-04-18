import * as companyService from "../services/companyService.js";
import * as employeeService from "../services/employeeService.js";
import * as cardService from "../services/cardService.js";
import { Request, Response } from "express";

export async function createCard(req: Request, res: Response) {
  
    const { employeeId, type } = req.body;
    const apiKey = req.headers['x-api-key'];
    
    if(!apiKey)
      return res.status(401).send(`Unauthorized! You must specify the x-api-key via headers`);
    if(!employeeId)
      return res.status(401).send(`The app is missing the employee ID`);
    else if(!type)
      return res.status(401).send(`The app is missing the card type`);

    await companyService.ensureCompanyDoesExist(apiKey.toString());
    
    const employee = await employeeService.ensureEmployeeDoesExist(employeeId);
   
    await cardService.ensureEmployeeDoesntHaveCard(employeeId, type);
    
    const newCard = await cardService.generateCardData(employeeId, type, employee.fullName);

    await cardService.createCard(newCard);

    return res.status(201).send('card successfully created');
}
