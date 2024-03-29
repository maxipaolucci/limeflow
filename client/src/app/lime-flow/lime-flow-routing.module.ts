/**
 * Created by mpaoluc on 13/01/2017.
 */
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LimeFlowComponent} from "./lime-flow.component";
import {LimeStateComponent} from "./components/lime-state/lime-state.component";
import {LimeNotFoundComponent} from "./components/lime-not-found/lime-not-found.component";

const limeflowRoutes: Routes = [
  {
    path: 'limeflow',
    component: LimeFlowComponent
  },
  {
    path : 'limeflow/state/:stateId',
    component : LimeStateComponent
  },
  {
    path : 'limeflow/lime-not-found',
    component : LimeNotFoundComponent
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