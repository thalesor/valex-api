import dayjs from "dayjs";
import bcrypt from "bcrypt";
import { faker } from '@faker-js/faker';
import * as cardRepository from "../repositories/cardRepository.js";
import { conflictError } from "../middlewares/errorHandlerMiddleware.js";

async function findCardByTypeAndEmployee(idEmployee: number, cardType: cardRepository.TransactionTypes) {
    const card = await cardRepository.findByTypeAndEmployeeId(cardType, idEmployee);
    if(card)
    throw conflictError(`this employee can't have more than one card of type ${cardType}`);
    return card;
}

export async function ensureEmployeeDoesntHaveCard(idEmployee: number, cardType: cardRepository.TransactionTypes) {
    return findCardByTypeAndEmployee(idEmployee, cardType);
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
    const ccv = bcrypt.hashSync(faker.finance.creditCardNumber('###'), 10);
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
    return await cardRepository.insert(card);
}



