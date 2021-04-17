import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConsortiumTicketsWebComponent} from './consortium/consortium-tickets-web.component';
import {RoleGuard} from '../../guards/role-guard.service';
import {AuthGuard} from '../../guards/auth-guard.service';
import {User} from '../../../../local-packages/banca-api';
import {TicketsWebComponent} from './tickets-web.component';
import {AdminTicketsWebComponent} from './admin/admin-tickets-web.component';
import {BankingTicketsWebComponent} from './banking/banking-tickets-web.component';

const routes: Routes = [
  {
    path: '', component: TicketsWebComponent
  },
  {
    path: 'admin', component: AdminTicketsWebComponent,
    canActivate: [RoleGuard, AuthGuard],
    data: {requiredRoles: [User.RoleEnum.Admin]},
  },
  {
    path: 'consortium', component: ConsortiumTicketsWebComponent,
    canActivate: [RoleGuard, AuthGuard],
    data: {requiredRoles: [User.RoleEnum.Consortium]},
  },
  {
    path: 'banker', component: BankingTicketsWebComponent,
    canActivate: [RoleGuard, AuthGuard],
    data: {requiredRoles: [User.RoleEnum.Banker]},
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsWebRoutingModule {
}
