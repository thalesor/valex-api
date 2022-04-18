import * as cardService from "../services/cardService.js";
import * as rechargeService from "../services/rechargeService.js";
import { Request, Response } from "express";

export async function insertRecharge(req: Request, res: Response) {
  
    const { cardId, amount } = req.body;
    const apiKey = req.headers['x-api-key'];

    if(!apiKey)
      return res.status(401).send(`Unauthorized! You must specify the x-api-key via headers`);
    if(!cardId)
      return res.status(401).send(`The app is missing the card's ID`);
    else if(!amount)
      return res.status(401).send(`The app is missing the amount for a recharge`);
  
    const card = await cardService.ensureCardDoesExist(Number(cardId));

    cardService.ensureCardHasNotExpired(card.expirationDate);
    
    const recharge = {
        ...req.body
    }

    await rechargeService.insertRecharge(recharge);
  
    return res.status(200).send(`card was successfully recharged in ${amount}`);
    
  }
