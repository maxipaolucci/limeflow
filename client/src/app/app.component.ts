import {Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as io from 'socket.io-client';
import {NgRedux, select, DevToolsExtension} from 'ng2-redux';
import { NgReduxRouter } from 'ng2-redux-router';
import { Observable } from 'rxjs';
import { List } from 'immutable';

import rootReducer from '../model/store';
import { IAppState, APP_INITIAL_STATE } from '../model/store';
import reduxLogger from '../model/configureLogger';

import { __DEVMODE__ } from "../constants/config";
import {VottingActions} from "./vottingActions.service";
import {VottingMiddleware} from "./vottingMiddleware.service";
import LimeFlow from "../core/LimeFlow";


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ VottingMiddleware ]
})
export class AppComponent implements OnInit {
  title : string = "Voting App";
  socket : any = null;
  // @select( (state : IAppState) => {
  //   console.log(state.vottingModel.getIn(['vote', 'pair'], List<string>()));
  //   return state.vottingModel.getIn(['vote', 'pair'], List<string>());
  // } ) votePair: Observable<List<string>>; //vote pair data using fn selector & inmutable
  //@select( ['vottingModel', 'vote', 'pair'] ) votePair: Observable<List<string>>; //vote pair data using path selector & inmutable
  //@select( ['vottingModel', 'vote'] ) vote: Observable<Map<string, any>>; //vote data
  
  constructor(
    private titleService : Title,
    private ngRedux: NgRedux<IAppState>,
    private ngReduxRouter: NgReduxRouter,
    private devTools: DevToolsExtension,
    private vottingActions: VottingActions,
    private vottingMiddleware: VottingMiddleware) {

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

  createLimeFlows() {
    let flow1 = new LimeFlow('flow1', 'This is the flow 1');
    console.log(flow1.toString());
  }

}