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


export interface Transaction {
    _id: object;
    createdAt: string;
    amount: number;
    description: string;
    type: Transaction.TypeEnum;
    lastBalance: number;
    actualBalance: number;
    originId: object;
    originObject: Transaction.OriginObjectEnum;
    destinationId: object;
    destinationObject: Transaction.DestinationObjectEnum;
    creationUserId: object;
    deletionDate: string;
    modificationUserId: object;
}
export namespace Transaction {
    export type TypeEnum = 'credit' | 'debit' | 'adjust';
    export const TypeEnum = {
        Credit: 'credit' as TypeEnum,
        Debit: 'debit' as TypeEnum,
        Adjust: 'adjust' as TypeEnum
    };
    export type OriginObjectEnum = 'banking' | 'consortium' | 'webuser' | 'unknown';
    export const OriginObjectEnum = {
        Banking: 'banking' as OriginObjectEnum,
        Consortium: 'sysadmin' as OriginObjectEnum,
        Webuser: 'webuser' as OriginObjectEnum,
        Unknown: 'unknown' as OriginObjectEnum
    };
    export type DestinationObjectEnum = 'banking' | 'consortium' | 'webuser' | 'unknown';
    export const DestinationObjectEnum = {
        Banking: 'banking' as DestinationObjectEnum,
        Consortium: 'sysadmin' as DestinationObjectEnum,
        Webuser: 'webuser' as DestinationObjectEnum,
        Unknown: 'unknown' as DestinationObjectEnum
    };
}


