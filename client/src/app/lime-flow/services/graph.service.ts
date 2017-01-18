/**
 * Created by Maxi Paolucci on 12/12/2016.
 */
import { Injectable }	from '@angular/core';
import CytoscapeFlow from "../ng-core/CytoscapeFlow";


/**
 * This service is going to be created as one instance per graph component
 */
@Injectable()
export class GraphService {

  private workflow : CytoscapeFlow = null;

  constructor () {}

  getWorkflow() : CytoscapeFlow {
    return this.workflow;
  }

  setWorkFlow(workflow : CytoscapeFlow) : void {
    this.workflow = workflow;
  }
}