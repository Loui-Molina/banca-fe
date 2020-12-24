import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LotteriesComponent } from './lotteries.component';

const routes: Routes = [
  { path: '', component: LotteriesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LotteriesRoutingModule { }
