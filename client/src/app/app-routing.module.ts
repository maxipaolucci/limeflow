/**
 * Created by mpaoluc on 13/01/2017.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LimeFlowComponent} from "./components/lime-flow/limeFlow.component";
import {PageNotFoundComponent} from "./components/page-not-found/pageNotFound.component";

const appRoutes : Routes = [
  {
    path : 'workflow',
    component : LimeFlowComponent
  },
  {
    path : '',
    redirectTo : '/workflow',
    pathMatch : 'full'
  },
  {
    path : '**',
    component : PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
