import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import {BankingComponent} from './banking/banking.component';
import {AdminComponent} from './admin/admin.component';
import {ConsortiumComponent} from './consortium/consortium.component';
import {RoleGuard} from '../../guards/role-guard.service';
import {AuthGuard} from '../../guards/auth-guard.service';
import {UserRole} from '../../../../local-packages/banca-api';

const routes: Routes = [
  {
    path: '', component: DashboardComponent
  },
  {
    path: 'admin', component: AdminComponent,
    canActivate: [RoleGuard, AuthGuard],
    data: {requiredRoles: [UserRole.admin]},
  },
  {
    path: 'consortium', component: ConsortiumComponent,
    canActivate: [RoleGuard, AuthGuard],
    data: {requiredRoles: [UserRole.consortium]},
  },
  {
    path: 'banker', component: BankingComponent,
    canActivate: [RoleGuard, AuthGuard],
    data: {requiredRoles: [UserRole.banker]},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
