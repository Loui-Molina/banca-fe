/**
 * Betting
 * Betting for Republic
 *
 * The version of the OpenAPI document: 1.0.3
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { BettingLimitUpdateLotteryDto } from './bettingLimitUpdateLotteryDto';
import { BlockedNumberDto } from './blockedNumberDto';
import { PrizeLimitUpdateLotteryDto } from './prizeLimitUpdateLotteryDto';


export interface ConsortiumUpdateLotteryDto { 
    _id?: object;
    bankings?: Array<string>;
    bettingLimits?: Array<BettingLimitUpdateLotteryDto>;
    prizeLimits?: Array<PrizeLimitUpdateLotteryDto>;
    blockedNumbers?: Array<BlockedNumberDto>;
}

