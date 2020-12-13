import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SlotMachineComponent} from './slotMachine.component';

const routes: Routes = [
  { path: '', component: SlotMachineComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SlotMachineRoutingModule { }
