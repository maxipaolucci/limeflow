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
import {LimeFlowComponent} from "./components/lime-flow/limeFlow.component";
import {CommonGraphService} from "./services/common-graph.service";
import {LimeStateComponent} from "./components/lime-state/limeState.component";
import {PageNotFoundComponent} from "./components/page-not-found/pageNotFound.component";
import {AppRoutingModule} from "./app-routing.module";



@NgModule({
  imports: [ BrowserModule, HttpModule, AppRoutingModule, NgReduxModule ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LimeFlowComponent,
    LimeStateComponent,
    VottingComponent,
    VoteComponent,
    ResultsComponent ],
  bootstrap: [ AppComponent ],
  providers: [ Title, NgReduxRouter, DevToolsExtension, VottingActions, CommonGraphService ]
})
export class AppModule { }
