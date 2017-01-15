/**
 * Created by mpaoluc on 13/01/2017.
 */
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LimeFlowComponent} from "./lime-flow.component";
import {LimeStateComponent} from "./components/lime-state/lime-state.component";

const limeflowRoutes: Routes = [
  {
    path : 'limeflow',
    component : LimeFlowComponent,
    children : [
      {
        path : 'state/:id',
        component : LimeStateComponent
      }
    ]
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
export class LimeFlowRoutingModule { }