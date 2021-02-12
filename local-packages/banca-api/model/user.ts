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
import { UserPreference } from './userPreference';


export interface User { 
    _id: object;
    lastLogin: string;
    name: string;
    username: string;
    password: string;
    role: User.RoleEnum;
    preferences: UserPreference;
    salt: string;
    creationUserId: object;
    oldPasswords: Array<string>;
    deletionDate: string;
    modificationUserId: object;
}
export namespace User {
    export type RoleEnum = 'admin' | 'banker' | 'punter' | 'supervisor' | 'consortium' | 'carrier';
    export const RoleEnum = {
        Admin: 'admin' as RoleEnum,
        Banker: 'banker' as RoleEnum,
        Punter: 'punter' as RoleEnum,
        Supervisor: 'supervisor' as RoleEnum,
        Consortium: 'consortium' as RoleEnum,
        Carrier: 'carrier' as RoleEnum
    };
}


