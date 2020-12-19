import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {BrowserModule} from '@angular/platform-browser';
import {Page404Component} from './pages/problems/404/page404.component';
import {SlotMachineComponent} from './pages/machines/slotMachine/slotMachine.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  { path: 'authentication/login', loadChildren: () => import('./pages/authentication/login/login.module').then(m => m.LoginModule) },
  { path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule) }
    ]
  },
  { path: 'machines', loadChildren: () => import('./pages/machines/slotMachine/slotMachine.module').then(m => m.SlotMachineModule) },
  {
    path: 'game',
    redirectTo: 'game/dashboard',
    pathMatch: 'full'
  },
  { path: 'bettingPanel', canActivate: ['banker'], loadChildren: () => import('./pages/bettingPanel/bettingPanel.module').then(m => m.BettingPanelModule) },
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
export class AppRoutingModule { }
