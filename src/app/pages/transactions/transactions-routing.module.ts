import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoleGuard} from '../../guards/role-guard.service';
import {AuthGuard} from '../../guards/auth-guard.service';
import {User} from '@banca-api/model/user';
import {AdminTransactionsComponent} from './admin/admin-transactions.component';
import {TransactionsComponent} from './transactions.component';
import {ConsortiumTransactionsComponent} from './consortium/consortium-transactions.component';
import {BankingTransactionsComponent} from './banking/banking-transactions.component';

const routes: Routes = [
  {path: '', component: TransactionsComponent},
  {
    path: 'admin', component: AdminTransactionsComponent,
    canActivate: [RoleGuard, AuthGuard],
    data: {requiredRoles: [User.RoleEnum.Admin]},
  },
  {
    path: 'consortium', component: ConsortiumTransactionsComponent,
    canActivate: [RoleGuard, AuthGuard],
    data: {requiredRoles: [User.RoleEnum.Consortium]},
  },
  {
    path: 'banking', component: BankingTransactionsComponent,
    canActivate: [RoleGuard, AuthGuard],
    data: {requiredRoles: [User.RoleEnum.Banker]},
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule {
}
