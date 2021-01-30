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
import { Play } from './play';


export interface BetDto { 
    _id: object;
    plays: Array<Play>;
    sn: string;
    date: string;
    claimDate: string;
    betStatus: BetDto.BetStatusEnum;
    amountWin: number;
}
export namespace BetDto {
    export type BetStatusEnum = 'cancelled' | 'claimed' | 'pending' | 'winner' | 'loser';
    export const BetStatusEnum = {
        Cancelled: 'cancelled' as BetStatusEnum,
        Claimed: 'claimed' as BetStatusEnum,
        Pending: 'pending' as BetStatusEnum,
        Winner: 'winner' as BetStatusEnum,
        Loser: 'loser' as BetStatusEnum
    };
}


