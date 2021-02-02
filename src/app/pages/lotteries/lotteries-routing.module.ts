import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LotteriesComponent} from './lotteries.component';
import {RoleGuard} from '../../guards/role-guard.service';
import {AuthGuard} from '../../guards/auth-guard.service';
import {AdminLotteriesComponent} from './admin/admin-lotteries.component';
import {ConsortiumLotteriesComponent} from './consortium/consortium-lotteries.component';
import {User} from '../../../../local-packages/banca-api';

const routes: Routes = [
  {
    path: '', component: LotteriesComponent
  },
  {
    path: 'admin', component: AdminLotteriesComponent,
    canActivate: [RoleGuard, AuthGuard],
    data: {requiredRoles: [User.RoleEnum.Admin]},
  },
  {
    path: 'consortium', component: ConsortiumLotteriesComponent,
    canActivate: [RoleGuard, AuthGuard],
    data: {requiredRoles: [User.RoleEnum.Consortium]},
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LotteriesRoutingModule {
}
