import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WebUsersBetComponent} from './web.users-bet.component';

const routes: Routes = [
  {path: '', component: WebUsersBetComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebUsersBetRoutingModule {
}
