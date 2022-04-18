import dayjs from "dayjs";
import bcrypt from "bcrypt";
import { faker } from '@faker-js/faker';
import * as cardRepository from "../repositories/cardRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import { conflictError, notFoundError, unauthorizedError } from "../middlewares/errorHandlerMiddleware.js";

async function findById(id: number) {
    const card = await cardRepository.findById(id)
    if (!card) {
      throw notFoundError(`there's not any card registered with the id ${id}`);
    }
    return card;
  }

export async function ensureCardDoesExist(id: number) {
    return findById(id)
}

export function ensureIsCorrectCCV(ccv: string, compareTo: string) {
    if(!bcrypt.compareSync(ccv, compareTo))
    throw conflictError("That's not the CCV of this card");
}

export function ensureIsCorrectPassword(password: string, compareTo: string) {
    if(!bcrypt.compareSync(password, compareTo))
    throw unauthorizedError("Unauthorized! Password is invalid, try again");
}

export function ensureCardHasNotExpired(expirationDate: string)
{
    let splitDate = expirationDate.split("/");
    const cardIsExpired = dayjs().isAfter(`20${splitDate[1]}-${splitDate[0]}-31`);
    if(cardIsExpired)
    throw conflictError(`This card is expired, it's expire period was in ${expirationDate}`);
}

export function ensureCardHasNoPassword(card: cardRepository.Card)
{
    if(card.password !== null)
    throw conflictError(`This card has already been activated`);
}

export function ensureCardIsUnblocked(card: cardRepository.Card)
{
    if(card.isBlocked && card.password === null)
        throw conflictError(`This card has not been activated yet`);
    if(card.isBlocked && card.password !== null)
        throw conflictError(`This card has been blocked`);
    else
        return
}

export function convertNameToCardHolder(employeeName: string)
{
    let names = employeeName.split(" ");
    names = names.filter(word => word.length >= 3);
    let middlePosition = Math.floor(names.length/2);
    names[middlePosition] = names[middlePosition].substring(1,-1);
    return names.join(" ").toUpperCase();
}

export function generateCCV()
{
    const ccv = faker.finance.creditCardNumber('###');
    return ccv;
}

export async function generateUniqueCardNumber()
{
    const cardsList = await cardRepository.find();
    let randomNumber = faker.finance.creditCardNumber('#### #### #### ####'); 
    do{
        randomNumber = faker.finance.creditCardNumber('#### #### #### ####'); 
    }
    while(cardsList.find(card => card.number === randomNumber));

    return randomNumber;
}

export function makeCardExpirationDate()
{
    return dayjs(Date()).add(5, 'year').format("MM/YY");
}

export async function generateCardData(employeeId: number, cardType: cardRepository.TransactionTypes, employeeName: string)
{
    const card = {
        employeeId: employeeId,
        number: await generateUniqueCardNumber(),
        cardholderName: convertNameToCardHolder(employeeName),
        securityCode: generateCCV(),
        expirationDate: makeCardExpirationDate(),
        isVirtual: false,
        isBlocked: true,
        type: cardType
      } 
      return card;
}

export async function createCard(card: cardRepository.CardInsertData)
{
    card.securityCode = bcrypt.hashSync(card.securityCode, 10);
    return await cardRepository.insert(card);
}

export async function activateCard(id: number, password: string)
{
    const card = {
        password: bcrypt.hashSync(password, 10),
        isBlocked: false 
    }
    return await cardRepository.update(id, card);
}



