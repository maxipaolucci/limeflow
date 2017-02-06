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

  private flowMap : Map<string, {flow : CytoscapeFlow, flow$ : BehaviorSubject<CytoscapeFlow>}>;

  private workflow : CytoscapeFlow = null;
  private workflow$ : BehaviorSubject<CytoscapeFlow> = null;
  private num : number = 0;

  constructor () {
    this.flowMap = new Map<string, {flow : CytoscapeFlow, flow$ : BehaviorSubject<CytoscapeFlow>}>();
    //this.workflow$ = new BehaviorSubject<CytoscapeFlow>(null);
  }

  getWorkflow(id : string) : CytoscapeFlow {
    return this.flowMap.get(id).flow;
  }

  getWorkflow$(id : string) : BehaviorSubject<CytoscapeFlow> {
    return this.flowMap.get(id).flow$;
  }

  registerWorkflow(id : string, workflow : CytoscapeFlow) : void {
    //this.workflow = workflow;
    //this.workflow$.next(this.workflow);
    this.flowMap.set(id, {
      flow : workflow,
      flow$ : new BehaviorSubject<CytoscapeFlow>(workflow)
    });
  }

  setWorkflow(id : string, workflow : CytoscapeFlow) {
    let methodTrace = `${this.constructor.name} > setWorkflow() > `; //for debugging

    let workflowData = this.flowMap.get(id);
    if (workflowData) {
      workflowData.flow = workflow;
      workflowData.flow$.next(workflow);
    } else {
      console.error(`${methodTrace} Cannot find a workflow with ID: ${id}`);
    }
  }
}