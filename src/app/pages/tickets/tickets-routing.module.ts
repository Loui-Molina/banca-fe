import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConsotriumTicketsComponent} from './consortium/consotrium-tickets.component';
import {RoleGuard} from '../../guards/role-guard.service';
import {AuthGuard} from '../../guards/auth-guard.service';
import {User} from '../../../../local-packages/banca-api';
import {TicketsComponent} from './tickets.component';
import {AdminTicketsComponent} from './admin/admin-tickets.component';

const routes: Routes = [
  {
    path: '', component: TicketsComponent
  },
  {
    path: 'admin', component: AdminTicketsComponent,
    canActivate: [RoleGuard, AuthGuard],
    data: {requiredRoles: [User.RoleEnum.Admin]},
  },
  {
    path: 'consortium', component: ConsotriumTicketsComponent,
    canActivate: [RoleGuard, AuthGuard],
    data: {requiredRoles: [User.RoleEnum.Consortium]},
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule {
}
