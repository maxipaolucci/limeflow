/**
 * Created by mpaoluc on 13/01/2017.
 */
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LimeFlowComponent} from "./components/lime-flow/lime-flow.component";
import {LimeStateComponent} from "./components/lime-state/lime-state.component";
import {LimeNotFoundComponent} from "./components/lime-not-found/lime-not-found.component";

const limeflowRoutes: Routes = [
  {
    path: '',
    children : [
      {
        path: 'show',
        component: LimeFlowComponent
      },
      {
        path : 'state/:stateId',
        component : LimeStateComponent
      },
      {
        path : 'lime-not-found',
        component : LimeNotFoundComponent
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
export class LimeFlowAppRoutingModule { }