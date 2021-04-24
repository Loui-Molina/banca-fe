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
import { HttpHeaders }                                       from '@angular/common/http';

import { Observable }                                        from 'rxjs';

import { TicketWebDto } from '../model/models';


import { Configuration }                                     from '../configuration';



export interface TicketsWebServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: Configuration;
    

    /**
     * 
     * 
     */
    ticketsWebControllerGetAll(extraHttpRequestParams?: any): Observable<{}>;

}