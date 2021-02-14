import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WebUsersBetsComponent} from './web.users-bets.component';

const routes: Routes = [
  {path: '', component: WebUsersBetsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebUsersBetsRoutingModule {
}
