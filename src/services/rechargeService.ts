import * as rechargeRepository from "../repositories/rechargeRepository.js";

export async function insertRecharge(recharge: rechargeRepository.RechargeInsertData)
{
    return await rechargeRepository.insert(recharge);
}

export async function findByCardId(cardId: number) {
    return await rechargeRepository.findByCardId(cardId);
}





