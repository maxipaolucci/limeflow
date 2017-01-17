/**
 * Created by mpaoluc on 13/01/2017.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundComponent} from "./components/page-not-found/pageNotFound.component";

const appRoutes : Routes = [
  {
    path : '',
    redirectTo : '/limeflow',
    pathMatch : 'full'
  },
  {
    path : 'page-not-found',
    component : PageNotFoundComponent
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
