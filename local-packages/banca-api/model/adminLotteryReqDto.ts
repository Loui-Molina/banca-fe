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


export interface AdminLotteryReqDto { 
    _id?: object;
    name: string;
    nickname: string;
    color: string;
    playTime: string;
    status: boolean;
    results: Array<string>;
    openTime?: string;
    closeTime?: string;
    day: Array<AdminLotteryReqDto.DayEnum>;
}
export namespace AdminLotteryReqDto {
    export type DayEnum = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
    export const DayEnum = {
        Mon: 'mon' as DayEnum,
        Tue: 'tue' as DayEnum,
        Wed: 'wed' as DayEnum,
        Thu: 'thu' as DayEnum,
        Fri: 'fri' as DayEnum,
        Sat: 'sat' as DayEnum,
        Sun: 'sun' as DayEnum
    };
}

