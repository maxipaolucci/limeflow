import {Component, OnInit, OnDestroy} from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {GraphService} from "../../services/graph.service";
import CytoscapeState from "../../ng-core/CytoscapeState";
import CytoscapeFlow from "../../ng-core/CytoscapeFlow";
import NgLimeTask from "../../ng-core/NgLimeTask";
import {CommonGraphService} from "../../services/common-graph.service";
import {BehaviorSubject, Subject} from "rxjs/Rx";
import {LIMEFLOW_$_TIMEOUT} from "../../constants/constants";

/**
 * Created by Maxi Paolucci on 11/01/2017.
 */
@Component({
  selector: 'lime-state',
  templateUrl: './lime-state.component.html',
  styleUrls: ['./lime-state.component.scss'],
})
export class LimeStateComponent implements OnInit, OnDestroy {

  private limeflow : CytoscapeFlow;
  private state : CytoscapeState;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private graphService : GraphService) {

    this.limeflow = null;
    this.state = null;
  }

  ngOnInit() : void {
    let methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging

    let stateId = null;
    let flowId = null;

    // subscribe to the stateId parameter to make the state in this component match always the state with the id provided
    this.route.params.flatMap((params : Params) => {
      stateId = params['stateId'];
      flowId = params['flowId'];
      console.log(flowId);

      this.limeflow = this.graphService.getFlow(flowId);

      if (this.limeflow) {
        return new BehaviorSubject<CytoscapeFlow>(this.limeflow);
      } else {
        return <BehaviorSubject<CytoscapeFlow>>this.graphService.getFlow$(flowId);
      }
    }).filter((flow : CytoscapeFlow) => flow !== null) //filter null values
    .subscribe((flow : CytoscapeFlow) => {
      this.limeflow = flow;
      this.setState(stateId);
    }, error => {
      console.error(`${methodTrace}limeflow$ subscription timeout (20s) ocurred. ${error}`);
    }, () => {
      console.info(`${methodTrace}limeflow$ subscription completed.`);
    });
  }

  /**
   * Set the state of the component
   * @param stateId . The state id neccessary to retrieve a State instance from Limeflow
   */
  private setState(stateId : string) : void {
    let methodTrace = `${this.constructor.name} > setState(${stateId}) > `; //for debugging
    if (this.limeflow) {
      this.state = this.limeflow.getStateById(stateId);
      if (!this.state) {
        console.error(`${methodTrace} The workflow has not got a State with the provided ID: ${stateId}.`);
        this.router.navigate(['/limeflow/lime-not-found', {componentType: 'State', componentId: stateId}]);
      }
    }
  }

  /**
   * Navigates the user directly to the task component url. This feature requires that the task<NgLimeTask> selected has a
   * url defined to where to look at it.
   * @param task : NgLimeTask . The task to go to.
   */
  goToTask(task : NgLimeTask) {
    let methodTrace = `${this.constructor.name} > goToTask() > `; //for debugging
    if (task.getUrlToComponent()) {
      //if the task has an urlToComponent set then navigate there
      return this.router.navigate([task.getUrlToComponent()]);
    }

    console.error(`${methodTrace}The task does not have a url set in the graph definition (check urlToComponent 
      property in task json object in the graph json definition).`);
    this.router.navigate(['/limeflow/lime-not-found', {componentType: 'Task', componentId: task.getId()}]);
  }

  /**
   * Return the status color for a status value.
   * @param status . The value provided
   * @returns {string} . The Hex code as string of the status color
   */
  getCssStatusColor(status : number) : string {
    return CommonGraphService.getUIStatusInfo(status, 'color');
  }

  ngOnDestroy() {
    let methodTrace = `${this.constructor.name} > ngOnDestroy() > `; //for debugging
    console.info(`${methodTrace} Method called`);
  }
}