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


export interface BettingLimit { 
    playType: BettingLimit.PlayTypeEnum;
    status: boolean;
    betAmount?: number;
    creationUserId?: string;
    deletionDate?: string;
    modificationUserId?: string;
}
export namespace BettingLimit {
    export type PlayTypeEnum = 'direct' | 'pale' | 'tripleta' | 'superPale' | 'cash3straight' | 'cash3Box' | 'play4Straight' | 'play4Box' | 'pick5Straigh' | 'pick5Box' | 'singulation' | 'bolita';
    export const PlayTypeEnum = {
        Direct: 'direct' as PlayTypeEnum,
        Pale: 'pale' as PlayTypeEnum,
        Tripleta: 'tripleta' as PlayTypeEnum,
        SuperPale: 'superPale' as PlayTypeEnum,
        Cash3straight: 'cash3straight' as PlayTypeEnum,
        Cash3Box: 'cash3Box' as PlayTypeEnum,
        Play4Straight: 'play4Straight' as PlayTypeEnum,
        Play4Box: 'play4Box' as PlayTypeEnum,
        Pick5Straigh: 'pick5Straigh' as PlayTypeEnum,
        Pick5Box: 'pick5Box' as PlayTypeEnum,
        Singulation: 'singulation' as PlayTypeEnum,
        Bolita: 'bolita' as PlayTypeEnum
    };
}


