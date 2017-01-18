import {Component, OnInit, Input} from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {GraphService} from "../../services/graph.service";
import CytoscapeState from "../../ng-core/CytoscapeState";
import CytoscapeFlow from "../../ng-core/CytoscapeFlow";
import NgLimeTask from "../../ng-core/NgLimeTask";
import {CommonGraphService} from "../../services/common-graph.service";

/**
 * Created by Maxi Paolucci on 11/01/2017.
 */
@Component({
  selector: 'lime-state',
  templateUrl: './lime-state.component.html',
  styleUrls: ['./lime-state.component.scss'],
})
export class LimeStateComponent implements OnInit {

  private limeflow : CytoscapeFlow = null;
  private state : CytoscapeState = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private commonGraphService : CommonGraphService,
              private graphService : GraphService) {

  }

  ngOnInit() : void {
    let methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging

    this.limeflow = this.graphService.getWorkflow();
    if (this.limeflow) {
      // subscribe to the stateId parameter to make the state in this component match always the state with the id provided
      this.route.params.subscribe((params: Params) => {
        this.state = <CytoscapeState>this.limeflow.getStateById(params['stateId']);
        if (!this.state) {
          console.error(`${methodTrace} The workflow has not got a State with the provided ID: ${params['stateId']}.`);
          this.router.navigate(['/limeflow/lime-not-found', {componentType : 'State', componentId : params['stateId']}] );
        }
      });
    } else {
      let stateId = this.route.snapshot.params['stateId'];
      // limeflow is not created yet. The user access this component directly by url so we redirect him to /limeflow passing it
      // an optional stateId parameter (the one looked for in the url) to create a workflow and be redirected again to
      // the state component with the state id provided the first time.
      console.warn(`${methodTrace} The workflow is not defined yet. Cannot retrieve state "${stateId}" from it. Redirecting to /limeflow...`);
      this.router.navigate(['/limeflow', { stateId : stateId } ]);
    }
  }

  goToTask(task : NgLimeTask) {
    //this.router.navigate(['/limeflow/state', this.state.getId(), 'task', task.getId()]);
    this.router.navigate([task.getUrlToComponent(), { task : task }]);
  }
}