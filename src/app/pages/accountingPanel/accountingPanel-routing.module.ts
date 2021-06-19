import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountingPanelComponent} from './accountingPanel.component';

const routes: Routes = [
  {path: '', component: AccountingPanelComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountingPanelRoutingModule {
}
