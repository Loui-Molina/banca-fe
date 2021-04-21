import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BalanceComponent} from './balance.component';
import {RoleGuard} from '../../guards/role-guard.service';
import {AuthGuard} from '../../guards/auth-guard.service';
import {AdminBalanceComponent} from './admin/admin-balance.component';
import {ConsortiumBalanceComponent} from './consortium/consortium-balance.component';
import {User} from '../../../../local-packages/banca-api';

const routes: Routes = [
  {
    path: '', component: BalanceComponent
  },
  {
    path: 'admin', component: AdminBalanceComponent,
    canActivate: [RoleGuard, AuthGuard],
    data: {requiredRoles: [User.RoleEnum.Admin]},
  },
  {
    path: 'consortium', component: ConsortiumBalanceComponent,
    canActivate: [RoleGuard, AuthGuard],
    data: {requiredRoles: [User.RoleEnum.Consortium]},
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BalanceRoutingModule {
}
