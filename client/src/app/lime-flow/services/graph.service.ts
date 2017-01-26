/**
 * Created by Maxi Paolucci on 12/12/2016.
 */
import { Injectable }	from '@angular/core';
import CytoscapeFlow from "../ng-core/CytoscapeFlow";
import {BehaviorSubject} from "rxjs/Rx";


/**
 * This service is going to be created as one instance per graph component
 */
@Injectable()
export class GraphService {

  private workflow : CytoscapeFlow = null;
  workflow$ : BehaviorSubject<CytoscapeFlow> = null;

  constructor () {
    this.workflow$ = new BehaviorSubject<CytoscapeFlow>(null);
  }

  getWorkflow() : CytoscapeFlow {
    return this.workflow;
  }

  setWorkFlow(workflow : CytoscapeFlow) : void {
    this.workflow = workflow;
    this.workflow$.next(this.workflow);
  }
}