import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {Page404Component} from './pages/problems/404/page404.component';
import {RoleGuard} from './guards/role-guard.service';
import {AuthGuard} from './guards/auth-guard.service';
import {UserRole} from '../../local-packages/banca-api';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/authentication/login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'users',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule)
      }
    ]
  },
  {
    path: 'machines',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/machines/slotMachine/slotMachine.module').then(m => m.SlotMachineModule)
  },
  {
    path: 'bettingPanel',
    canActivate: [RoleGuard, AuthGuard],
    data: {requiredRoles: UserRole.banker},
    loadChildren: () => import('./pages/bettingPanel/bettingPanel.module').then(m => m.BettingPanelModule)
  },
  {path: '404', component: Page404Component},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
