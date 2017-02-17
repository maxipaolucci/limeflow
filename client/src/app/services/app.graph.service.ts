/**
 * Created by Maxi Paolucci on 12/12/2016.
 */
import { Injectable }	from '@angular/core';
import {BehaviorSubject} from "rxjs/Rx";
import CytoscapeFlow from "../lime-flow/ng-core/CytoscapeFlow";


/**
 * This service is going to be created as one instance per graph component
 */
@Injectable()
export class AppGraphService {

  private flow : CytoscapeFlow;
  private flow$ : BehaviorSubject<CytoscapeFlow>;

  constructor () {
    this.flow = null;
    this.flow$ = new BehaviorSubject<CytoscapeFlow>(null);
  }

  getFlow() : CytoscapeFlow {
    return this.flow;
  }

  getFlow$() : BehaviorSubject<CytoscapeFlow> {
    return this.flow$;
  }

  updateFlow(flow : CytoscapeFlow) : void {
    this.flow = flow;
    this.flow$.next(this.flow);
  }
}