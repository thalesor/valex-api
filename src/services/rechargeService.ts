import * as rechargeRepository from "../repositories/rechargeRepository.js";

export async function insertRecharge(recharge: rechargeRepository.RechargeInsertData)
{
    return await rechargeRepository.insert(recharge);
}




