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


export interface SignUpCredentialsDto { 
    username: string;
    password: string;
    name: string;
    role?: SignUpCredentialsDto.RoleEnum;
    _id?: object;
}
export namespace SignUpCredentialsDto {
    export type RoleEnum = 'admin' | 'banker' | 'supervisor' | 'consortium' | 'carrier' | 'webuser';
    export const RoleEnum = {
        Admin: 'admin' as RoleEnum,
        Banker: 'banker' as RoleEnum,
        Supervisor: 'supervisor' as RoleEnum,
        Consortium: 'consortium' as RoleEnum,
        Carrier: 'carrier' as RoleEnum,
        Webuser: 'webuser' as RoleEnum
    };
}


