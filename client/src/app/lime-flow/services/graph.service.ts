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

  //a map of flow registered in the app indexed by flow id
  private flowMap : Map<string, {flow : CytoscapeFlow, flow$ : BehaviorSubject<CytoscapeFlow>}>;

  constructor () {
    this.flowMap = new Map<string, {flow : CytoscapeFlow, flow$ : BehaviorSubject<CytoscapeFlow>}>();
  }

  getFlow(id : string) : CytoscapeFlow {
    return this.flowMap.get(id).flow;
  }

  getFlow$(id : string) : BehaviorSubject<CytoscapeFlow> {
    return this.flowMap.get(id).flow$;
  }

  /**
   * Register a new flow and flow$ in the flowMap.
   * @param id . The id of the new flow
   * @param workflow . The flow.
   */
  setNewFlow(id : string, workflow : CytoscapeFlow) : void {
    this.flowMap.set(id, {
      flow : workflow,
      flow$ : new BehaviorSubject<CytoscapeFlow>(workflow)
    });
  }

  /**
   * Set a new flow instance in an existent entry in the flowMap for the id provided.
   * @param id . The id of the entry to update
   * @param workflow . The new flow.
   */
  updateFlow(id : string, workflow : CytoscapeFlow) {
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