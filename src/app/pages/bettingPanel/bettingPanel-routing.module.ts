import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BettingPanelComponent} from './bettingPanel.component';

const routes: Routes = [
  { path: '', component: BettingPanelComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BettingPanelRoutingModule { }
