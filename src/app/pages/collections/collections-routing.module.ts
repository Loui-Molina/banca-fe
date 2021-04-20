import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CollectionsComponent} from './collections.component';
import {RoleGuard} from '../../guards/role-guard.service';
import {AuthGuard} from '../../guards/auth-guard.service';
import {AdminCollectionsComponent} from './admin/admin-collections.component';
import {SysadminCollectionsComponent} from './sysadmin/sysadmin-collections.component';
import {User} from '../../../../local-packages/banca-api';

const routes: Routes = [
  {
    path: '', component: CollectionsComponent
  },
  {
    path: 'admin', component: AdminCollectionsComponent,
    canActivate: [RoleGuard, AuthGuard],
    data: {requiredRoles: [User.RoleEnum.Admin]},
  },
  {
    path: 'sysadmin', component: SysadminCollectionsComponent,
    canActivate: [RoleGuard, AuthGuard],
    data: {requiredRoles: [User.RoleEnum.Sysadmin]},
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionsRoutingModule {
}
