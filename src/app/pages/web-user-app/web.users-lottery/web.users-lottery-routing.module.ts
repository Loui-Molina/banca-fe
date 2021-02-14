import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WebUsersLotteryComponent} from './web.users-lottery.component';

const routes: Routes = [
  {path: '', component: WebUsersLotteryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebUsersLotteryRoutingModule {
}
