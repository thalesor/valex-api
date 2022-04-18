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
   
    await employeeService.ensureEmployeeDoesntHaveCard(employeeId, type);
    
    const newCard = await cardService.generateCardData(employeeId, type, employee.fullName);

    const { number, cardholderName, securityCode }  = newCard;

    await cardService.createCard(newCard);

    return res.status(201).send(`card successfully created: 
    {
        Number: ${number}
        Holder: ${cardholderName}
        CCV: ${securityCode}
    }`);
}

export async function activateCard(req: Request, res: Response) {
  
  const { id } = req.params;
  const { ccv, password } = req.body;

  if(!id)
    return res.status(401).send(`The app is missing the card's ID`);
  else if(isNaN(Number(id)))
    return res.status(401).send(`The informed card's ID must be a number`);
  else if(!ccv)
    return res.status(401).send(`The app is missing the card's CCV`);
  else if(!password)
    return res.status(401).send(`The app is missing the password for this card`);

  const card = await cardService.ensureCardDoesExist(Number(id));

  cardService.ensureIsCorrectCCV(ccv, card.securityCode);

  cardService.ensureCardHasNotExpired(card.expirationDate);
  
  cardService.ensureCardHasNoPassword(card);

  await cardService.activateCard(Number(id), password);

  return res.status(200).send("card successfully activated");
  
}
