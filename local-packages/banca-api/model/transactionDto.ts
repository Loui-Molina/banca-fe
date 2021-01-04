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


export interface TransactionDto { 
    _id: object;
    type: TransactionDto.TypeEnum;
    originUserId: object;
    destinationUserId: object;
    amount: number;
}
export namespace TransactionDto {
    export type TypeEnum = 'deposit' | 'extraction' | 'adjust';
    export const TypeEnum = {
        Deposit: 'deposit' as TypeEnum,
        Extraction: 'extraction' as TypeEnum,
        Adjust: 'adjust' as TypeEnum
    };
}

