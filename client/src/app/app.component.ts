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
import State from "../core/State";
import Link from "../core/Link";
import ILimeFlow from "../core/Interfaces/ILimeFlow";
import {CytoscapeInitialisationService} from "./services/cytoscape-initialisation.service";


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ VottingMiddleware ]
})
export class AppComponent implements OnInit {
  title : string = "Voting App";
  socket : any = null;
  flow1 : LimeFlow = null;
  // @select( (state : IAppState) => {
  //   console.log(state.vottingModel.getIn(['vote', 'pair'], List<string>()));
  //   return state.vottingModel.getIn(['vote', 'pair'], List<string>());
  // } ) votePair: Observable<List<string>>; //vote pair data using fn selector & inmutable
  //@select( ['vottingModel', 'vote', 'pair'] ) votePair: Observable<List<string>>; //vote pair data using path selector & inmutable
  //@select( ['vottingModel', 'vote'] ) vote: Observable<Map<string, any>>; //vote data
  
  constructor(
    private titleService : Title,
    private cytoscapeInitialisationService : CytoscapeInitialisationService,
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
    this.createLimeFlows();
  }

  createLimeFlows() {
    this.flow1 = new LimeFlow('flow1', 'This is the flow 1');
    let s1 = new State('s1', 'State 1');
    let s2 = new State('s2', 'State 2');
    let s3 = new State('s3', 'State 3');
    this.flow1.addState(s1);
    this.flow1.addState(s2);
    this.flow1.addState(s3);
    let l1 = new Link('l1', s1, s2);
    let l2 = new Link('l2', s2, s3, 'Link from State 2 to State 3');
    this.flow1.addLink(l1);
    this.flow1.addLink(l2);
    console.log(this.flow1.toString());
    console.log(JSON.stringify(this.flow1.toJSON()));
  }

  ngAfterViewInit() {
    this.render();
  }

  render() {
    let config = {
      elements : this.flow1.toJSON(),
      container: this.cytoscapeInitialisationService.initContainer(),
      style: this.cytoscapeInitialisationService.initStyleSheet(),
      layout: this.cytoscapeInitialisationService.initLayout()
    };
    cytoscape(config);
  }

}