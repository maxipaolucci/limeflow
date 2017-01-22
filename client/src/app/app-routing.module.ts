/**
 * Created by mpaoluc on 13/01/2017.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundComponent} from "./components/page-not-found/pageNotFound.component";
import {T1Component} from "./components/tasks/t1/t1.component";

const appRoutes : Routes = [
  // {
  //   path : '',
  //   redirectTo : '/limeflow',
  //   pathMatch : 'full'
  // },
  {
    path : 'task/t1',
    component : T1Component
  },
  {
    path : 'page-not-found',
    component : PageNotFoundComponent
  }
  // ,
  // {
  //   path : '**',
  //   component : PageNotFoundComponent
  // }
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
