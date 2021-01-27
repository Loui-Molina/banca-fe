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


export interface Bet { 
    _id: object;
    plays: Array<Play>;
    date: string;
    sn: string;
    betStatus: Bet.BetStatusEnum;
    deletionDate: string;
    modificationUserId: string;
}
export namespace Bet {
    export type BetStatusEnum = 'cancelled' | 'pending' | 'winner' | 'loser';
    export const BetStatusEnum = {
        Cancelled: 'cancelled' as BetStatusEnum,
        Pending: 'pending' as BetStatusEnum,
        Winner: 'winner' as BetStatusEnum,
        Loser: 'loser' as BetStatusEnum
    };
}


