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
import { SignUpCredentialsDto } from './signUpCredentialsDto';


export interface UpdateBankingDto { 
    _id: object;
    name: string;
    status: boolean;
    ownerUserId?: object;
    user: SignUpCredentialsDto;
    showPercentage: boolean;
    cancellationTime: number;
    selectedConsortium: object;
    header: string;
    footer: string;
}

