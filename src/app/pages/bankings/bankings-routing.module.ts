import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BankingsComponent} from './bankings.component';

const routes: Routes = [
  {path: '', component: BankingsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankingsRoutingModule {
}
