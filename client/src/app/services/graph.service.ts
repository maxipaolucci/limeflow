/**
 * Created by Maxi Paolucci on 12/12/2016.
 */
import { Injectable }	from '@angular/core';
import LimeFlow from "../../core/LimeFlow";


/**
 * This service is going to be created as one instance per graph component
 */
@Injectable()
export class GraphService {

  private workflow : LimeFlow = null;

  constructor () {}

  getWorkflow() : LimeFlow {
    return this.workflow;
  }

  setWorkFlow(workflow : LimeFlow) : void {
    this.workflow = workflow;
  }
}