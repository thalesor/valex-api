import * as cardService from "../services/cardService.js";
import * as businessService from "../services/businessService.js";
import * as rechargeService from "../services/rechargeService.js";
import * as paymentService from "../services/paymentService.js";
import { Request, Response } from "express";

export async function insertPosPayment(req: Request, res: Response) {
  
    const { cardId, amount, password : givenPassword, businessId } = req.body;;

    if(!cardId)
      return res.status(401).send(`The system is missing the card's ID`);
    else if(!amount)
      return res.status(401).send(`The system is missing the amount of this payment`);
    else if(!givenPassword)
      return res.status(401).send(`The system is missing the card's password`);
    else if(!businessId)
      return res.status(401).send(`The system is missing the business ID`);
    
    const card = await cardService.ensureCardDoesExist(Number(cardId));

    cardService.ensureIsCorrectPassword(givenPassword, card.password);
    
    await cardService.ensureCardIsUnblocked(card);

    cardService.ensureCardHasNotExpired(card.expirationDate);
    
    const business = await businessService.ensureBusinessDoesExist(businessId);

    businessService.ensureBusinessAndCardTypeMatch(business, card);

    const rechargesList = await rechargeService.findByCardId(cardId);
    const paymentsList = await paymentService.findByCardId(cardId);

    await paymentService.ensureCardHasEnoughAmount(amount, rechargesList, paymentsList);

    const payment = {
        ...req.body
    }

    delete(payment.givenPassword);

    await paymentService.insertPosPayment(payment);
  
    return res.status(200).send(`Payment successfully made`);
    
  }
