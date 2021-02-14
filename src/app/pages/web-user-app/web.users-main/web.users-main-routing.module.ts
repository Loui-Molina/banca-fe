import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WebUsersMainComponent} from './web.users-main.component';

const routes: Routes = [
    {path: '', component: WebUsersMainComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebUsersMainRoutingModule {
}
