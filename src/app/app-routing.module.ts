import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {GameLayoutComponent} from './pages/game/gamelayout/gamelayout.component';
import {BrowserModule} from '@angular/platform-browser';
import {Page404Component} from './pages/problems/404/page404.component';

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
      { path: 'accounts', loadChildren: () => import('./pages/accounts/accounts.module').then(m => m.AccountsModule) }
    ]
  },
  {
    path: 'game',
    redirectTo: 'game/dashboard',
    pathMatch: 'full'
  },
  { path: 'game',
    component: GameLayoutComponent,
    children: [
      { path: 'dashboard', loadChildren:  () => import('./pages/game/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'play', loadChildren:  () => import('./pages/game/play/play.module').then(m => m.PlayModule) },
      { path: 'howitworks', loadChildren:  () => import('./pages/game/howitworks/howitworks.module').then(m => m.HowitworksModule) },
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
