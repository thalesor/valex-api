import * as paymentRepository from "../repositories/paymentRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import { unauthorizedError } from "../middlewares/errorHandlerMiddleware.js";

export async function insertPosPayment(payment: paymentRepository.PaymentInsertData)
{
    return await paymentRepository.insert(payment);
}

export async function findByCardId(cardId: number) {
    return await paymentRepository.findByCardId(cardId);
}

export function ensureCardHasEnoughAmount(willPaymentAmount: number, rechargesList: rechargeRepository.Recharge[],
paymentsList: paymentRepository.Payment[])
{
    const rechargesAmout = rechargesList.reduce((a, b) => a + b.amount, 0);
    const paymentsAmount = paymentsList.reduce((a, b) => a + b.amount, 0);

    const totalAvailable = rechargesAmout - paymentsAmount;
    if(willPaymentAmount > totalAvailable)
        throw unauthorizedError("Unauthorized! this card's available amount is not enough to cover this payment");
}



