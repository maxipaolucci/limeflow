import {Component, OnInit, Input} from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {GraphService} from "../../services/graph.service";
import CytoscapeState from "../../cytoscape-core/CytoscapeState";
import CytoscapeFlow from "../../cytoscape-core/CytoscapeFlow";
import {CommonGraphService} from "../../services/common-graph.service";
import Task from "../../../../core/Task";

/**
 * Created by Maxi Paolucci on 11/01/2017.
 */
@Component({
  selector: 'lime-task',
  templateUrl: './lime-task.component.html',
  styleUrls: ['./lime-task.component.scss'],
})
export class LimeTaskComponent implements OnInit {

  private limeflow : CytoscapeFlow;
  private state : CytoscapeState;
  private task : Task;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private commonGraphService : CommonGraphService,
              private graphService : GraphService) {

    this.limeflow = null;
    this.state = null;
    this.task = null;
  }

  ngOnInit() : void {
    let methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging
    this.limeflow = this.graphService.getWorkflow();
    if (this.limeflow) {
      // subscribe to the stateId parameter to make the state in this component match always the state with the id provided
      this.route.params.subscribe((params: Params) => {
        this.task = this.limeflow.getTaskById(params['taskId']);
        if (!this.task) {
          console.error(`${methodTrace} The workflow has not got a Task with the provided ID "${params['taskId']}"}.`);
          this.router.navigate(['/limeflow/lime-not-found', {componentType : 'Task', componentId : params['taskId']}] );
        }
      });
    } else {
      let taskId : string = this.route.snapshot.params['taskId'];
      let stateId : string = this.route.snapshot.parent.params['stateId'];
      // limeflow is not created yet. The user access this component directly by url so we redirect him to /limeflow passing it
      // an optional stateId parameter (the one looked for in the url) to create a workflow and be redirected again to
      // the state component with the state id provided the first time.
      console.warn(`${methodTrace} The workflow is not defined yet. Cannot retrieve task "${taskId}" from it. Redirecting to /limeflow...`);
      this.router.navigate(['/limeflow', { taskId : taskId, stateId : stateId } ]);
    }
  }
}