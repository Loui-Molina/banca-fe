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


export interface CreateTransactionDto { 
    _id?: object;
    type?: CreateTransactionDto.TypeEnum;
    originId: object;
    destinationId: object;
    amount: number;
    originObject: CreateTransactionDto.OriginObjectEnum;
    destinationObject: CreateTransactionDto.DestinationObjectEnum;
}
export namespace CreateTransactionDto {
    export type TypeEnum = 'deposit' | 'prize' | 'extraction' | 'adjust';
    export const TypeEnum = {
        Deposit: 'deposit' as TypeEnum,
        Prize: 'prize' as TypeEnum,
        Extraction: 'extraction' as TypeEnum,
        Adjust: 'adjust' as TypeEnum
    };
    export type OriginObjectEnum = 'banking' | 'consortium';
    export const OriginObjectEnum = {
        Banking: 'banking' as OriginObjectEnum,
        Consortium: 'consortium' as OriginObjectEnum
    };
    export type DestinationObjectEnum = 'banking' | 'consortium';
    export const DestinationObjectEnum = {
        Banking: 'banking' as DestinationObjectEnum,
        Consortium: 'consortium' as DestinationObjectEnum
    };
}

