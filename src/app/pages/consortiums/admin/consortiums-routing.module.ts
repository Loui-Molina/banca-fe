import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConsortiumsComponent} from './consortiums.component';

const routes: Routes = [
  {path: '', component: ConsortiumsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsortiumsRoutingModule {
}
