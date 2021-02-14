import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WebUsersTransactionsComponent} from './web.users-transactions.component';

const routes: Routes = [
  {path: '', component: WebUsersTransactionsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebUsersTransactionsRoutingModule {
}
