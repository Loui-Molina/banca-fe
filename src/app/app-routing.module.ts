import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {BrowserModule} from '@angular/platform-browser';
import {Page404Component} from './pages/problems/404/page404.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  { path: 'authentication/login', loadChildren: () => import('./pages/authentication/login/login.module').then(m => m.LoginModule) },
  { path: 'game', loadChildren: () => import('./pages/game/home/home.module').then(m => m.HomeModule) },
  { path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'accounts', loadChildren: () => import('./pages/accounts/accounts.module').then(m => m.AccountsModule) }
    ]
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
export class AppRoutingModule { }
