/**
 * Created by mpaoluc on 13/01/2017.
 */
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LimeFlowComponent} from "./lime-flow/limeFlow.component";

const limeflowRoutes: Routes = [
  {
    path : 'limeflow',
    component : LimeFlowComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(limeflowRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LimeflowRoutingModule { }