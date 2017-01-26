///<reference path="../dts/cytoscape.d.ts" />
import {Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as io from 'socket.io-client';
import {NgRedux, DevToolsExtension} from 'ng2-redux';
import { NgReduxRouter } from 'ng2-redux-router';

import rootReducer from '../model/store';
import { IAppState, APP_INITIAL_STATE } from '../model/store';
import reduxLogger from '../model/configureLogger';

import { __DEVMODE__ } from "../constants/config";
import {VottingActions} from "./vottingActions.service";
import {VottingMiddleware} from "./vottingMiddleware.service";
import {BehaviorSubject} from "rxjs/Rx";
import CytoscapeFlow from "./lime-flow/ng-core/CytoscapeFlow";


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ VottingMiddleware ]
})
export class AppComponent implements OnInit {
  title : string = "LimeFlow App";
  socket : any = null;
  private limeflow$ : BehaviorSubject<CytoscapeFlow>;
  private limeflow : CytoscapeFlow;
  
  constructor(
    private titleService : Title,
    private ngRedux: NgRedux<IAppState>,
    private ngReduxRouter: NgReduxRouter,
    private devTools: DevToolsExtension,
    private vottingActions: VottingActions,
    private vottingMiddleware: VottingMiddleware) {

    this.limeflow$ = null;
    this.limeflow = null;

    //set title
    this.titleService.setTitle(this.title);

    this.socket = io(`${location.protocol}//${location.hostname}:3030`);

    let enhancers : any[] = [];
    let middlewares : any[] = [ vottingMiddleware.manageRemote(this.socket) ];
    // ... add whatever other enhancers you want.

    if (__DEVMODE__) {
      // we probably only want to expose this tool in devMode.
      middlewares = [...middlewares, reduxLogger];
      if (devTools.isEnabled()) {
        enhancers = [ ...enhancers, devTools.enhancer() ];
      }
    }

    this.ngRedux.configureStore(rootReducer, APP_INITIAL_STATE, middlewares, enhancers);
    this.ngReduxRouter.initialize();
  }

  ngOnInit() {
    this.socket.on('state', (state : any) => this.vottingActions.setState(state) ); //set a callback for 'state' events in socket
  }

  ngOnDestroy() {
    //unsubscribe from observers
    this.limeflow$.unsubscribe();
  }

  onGetFlow(limeflow$ : BehaviorSubject<CytoscapeFlow>) {
    let methodTrace = `${this.constructor.name} > onGetFlow() > `; //for debugging
    this.limeflow$ = limeflow$;
    this.limeflow$.subscribe(flow => {
      this.limeflow = flow;
      console.info(`${methodTrace} ${this.limeflow}`);
    });
  }
}