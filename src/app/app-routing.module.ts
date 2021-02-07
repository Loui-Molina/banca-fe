import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {Page404Component} from './pages/problems/404/page404.component';
import {RoleGuard} from './guards/role-guard.service';
import {AuthGuard} from './guards/auth-guard.service';
import {User} from '../../local-packages/banca-api';

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
        canActivate: [RoleGuard, AuthGuard],
        data: {requiredRoles: [User.RoleEnum.Admin, User.RoleEnum.Consortium, User.RoleEnum.Banker]},
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'users',
        canActivate: [RoleGuard, AuthGuard],
        data: {requiredRoles: [User.RoleEnum.Admin]},
        loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'transactions',
        canActivate: [RoleGuard, AuthGuard],
        data: {requiredRoles: [User.RoleEnum.Admin, User.RoleEnum.Consortium, User.RoleEnum.Banker]},
        loadChildren: () => import('./pages/transactions/transactions.module').then(m => m.TransactionsModule)
      },
      {
        path: 'consortiums',
        canActivate: [RoleGuard, AuthGuard],
        data: {requiredRoles: [User.RoleEnum.Admin]},
        loadChildren: () => import('./pages/consortiums/admin/consortiums.module').then(m => m.ConsortiumsModule)
      },
      {
        path: 'chat',
        canActivate: [RoleGuard, AuthGuard],
        data: {requiredRoles: [User.RoleEnum.Consortium, User.RoleEnum.Banker]},
        loadChildren: () => import('./pages/chats/chats.module').then(m => m.ChatsModule)
      },
      {
        path: 'bankings',
        canActivate: [RoleGuard, AuthGuard],
        data: {requiredRoles: [User.RoleEnum.Admin, User.RoleEnum.Consortium]},
        loadChildren: () => import('./pages/bankings/bankings.module').then(m => m.BankingsModule)
      },
      {
        path: 'lotteries',
        canActivate: [RoleGuard, AuthGuard],
        data: {requiredRoles: [User.RoleEnum.Admin, User.RoleEnum.Consortium]},
        loadChildren: () => import('./pages/lotteries/lotteries.module').then(m => m.LotteriesModule)
      },
      {
        path: 'results',
        canActivate: [RoleGuard, AuthGuard],
        data: {requiredRoles: [User.RoleEnum.Admin, User.RoleEnum.Consortium]},
        loadChildren: () => import('./pages/results/results.module').then(m => m.ResultsModule)
      },
      /*{
        path: 'subscriptions',
        canActivate: [RoleGuard, AuthGuard],
        data: {requiredRoles: [User.RoleEnum.Admin]},
        loadChildren: () => import('./pages/subscriptions/subscriptions.module').then(m => m.SubscriptionsModule)
      },*/
      {
        path: 'help',
        canActivate: [RoleGuard, AuthGuard],
        data: {requiredRoles: [User.RoleEnum.Admin]},
        loadChildren: () => import('./pages/help/help.module').then(m => m.HelpModule)
      }
    ]
  },
  {
    path: 'machines',
    canActivate: [RoleGuard, AuthGuard],
    data: {requiredRoles: [User.RoleEnum.Admin]},
    loadChildren: () => import('./pages/machines/slotMachine/slotMachine.module').then(m => m.SlotMachineModule)
  },
  {
    path: 'bettingPanel',
    canActivate: [RoleGuard, AuthGuard],
    data: {requiredRoles: [User.RoleEnum.Banker]},
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
