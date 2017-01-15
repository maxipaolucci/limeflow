import { NgModule } from '@angular/core';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { NgReduxModule, DevToolsExtension } from 'ng2-redux';
import {NgReduxRouter} from "ng2-redux-router";
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {VottingActions} from "./vottingActions.service";
import {VottingComponent} from "./components/votting/votting.component";
import {VoteComponent} from "./components/vote/vote.component";
import {ResultsComponent} from "./components/results/results.component";

import '../styles.global.scss';
import {PageNotFoundComponent} from "./components/page-not-found/pageNotFound.component";
import {AppRoutingModule} from "./app-routing.module";
import {LimeflowModule} from "./lime-flow/limeflow.module";



@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    LimeflowModule,
    AppRoutingModule,
    NgReduxModule ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    VottingComponent,
    VoteComponent,
    ResultsComponent ],
  bootstrap: [ AppComponent ],
  providers: [ Title, NgReduxRouter, DevToolsExtension, VottingActions ]
})
export class AppModule { }
