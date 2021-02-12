import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AdminLotteriesService } from './api/adminLotteries.service';
import { AuthService } from './api/auth.service';
import { AuthPasswordService } from './api/authPassword.service';
import { BankingService } from './api/banking.service';
import { BankingLotteriesService } from './api/bankingLotteries.service';
import { BettingPanelService } from './api/bettingPanel.service';
import { CommonService } from './api/common.service';
import { ConsortiumLotteriesService } from './api/consortiumLotteries.service';
import { ConsortiumsService } from './api/consortiums.service';
import { DashboardService } from './api/dashboard.service';
import { DefaultService } from './api/default.service';
import { MessagesService } from './api/messages.service';
import { ResultsService } from './api/results.service';
import { TransactionsService } from './api/transactions.service';
import { UsersService } from './api/users.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: []
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
