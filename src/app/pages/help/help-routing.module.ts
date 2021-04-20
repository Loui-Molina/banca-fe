import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoleGuard} from '../../guards/role-guard.service';
import {AuthGuard} from '../../guards/auth-guard.service';
import {HelpComponent} from './help.component';
import {AdminHelpComponent} from './admin/admin-help.component';
import {User} from '../../../../local-packages/banca-api';

const routes: Routes = [
  {path: '', component: HelpComponent},
  {
    path: 'admin', component: AdminHelpComponent,
    canActivate: [RoleGuard, AuthGuard],
    data: {requiredRoles: [User.RoleEnum.Admin]},
  },
  /*{
    path: 'consortium', component: ConsortiumTransactionsComponent,
    canActivate: [RoleGuard, AuthGuard],
    data: {requiredRoles: [User.RoleEnum.Consortium]},
  },
  {
    path: 'banking', component: BankingTransactionsComponent,
    canActivate: [RoleGuard, AuthGuard],
    data: {requiredRoles: [User.RoleEnum.Banker]},
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpRoutingModule {
}
