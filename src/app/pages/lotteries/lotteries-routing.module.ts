import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LotteriesComponent } from './lotteries.component';
import {RoleGuard} from '../../guards/role-guard.service';
import {AuthGuard} from '../../guards/auth-guard.service';
import {UserRole} from '../../../../local-packages/banca-api';
import {AdminLotteriesComponent} from "./admin/admin-lotteries.component";
import {ConsortiumLotteriesComponent} from "./consortium/consortium-lotteries.component";

const routes: Routes = [
  {
    path: '', component: LotteriesComponent
  },
  {
    path: 'admin', component: AdminLotteriesComponent,
    canActivate: [RoleGuard, AuthGuard],
    data: {requiredRoles: [UserRole.admin]},
  },
  {
    path: 'consortium', component: ConsortiumLotteriesComponent,
    canActivate: [RoleGuard, AuthGuard],
    data: {requiredRoles: [UserRole.consortium]},
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LotteriesRoutingModule { }
