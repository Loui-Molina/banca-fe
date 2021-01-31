import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BettingPanelComponent} from './bettingPanel.component';

const routes: Routes = [
  {path: '', component: BettingPanelComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BettingPanelRoutingModule {
}
