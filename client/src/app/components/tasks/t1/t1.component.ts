/**
 * Created by mpaoluc on 13/01/2017.
 */
import {Component, OnInit, OnDestroy} from '@angular/core';
import NgLimeTask from "../../../lime-flow/ng-core/NgLimeTask";
import CytoscapeFlow from "../../../lime-flow/ng-core/CytoscapeFlow";
import {BehaviorSubject} from "rxjs";
import {AppGraphService} from "../../../services/app.graph.service";
import {Router} from "@angular/router";

@Component({
  selector: 'task-t1',
  templateUrl: '../tasks.component.html',
  styleUrls: ['../tasks.component.scss']
})
export class T1Component implements OnInit, OnDestroy {

  private taskId : string = 't1';
  private task : NgLimeTask;
  private ngLimeTask : NgLimeTask;
  private limeflow : CytoscapeFlow;
  private limeflow$ : BehaviorSubject<CytoscapeFlow>;

  constructor(
      private appGraphService : AppGraphService,
      private router: Router
  ) {
    this.ngLimeTask = null;
    this.limeflow$ = this.appGraphService.workflow$;
    this.limeflow = null;
    this.task = null;
  }

  ngOnInit() {
    let methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging

    this.limeflow = this.appGraphService.getWorkflow();
    if (this.limeflow) {
      this.limeflow$ = new BehaviorSubject<CytoscapeFlow>(this.limeflow);
    } else {
      this.limeflow$ = <BehaviorSubject<CytoscapeFlow>>this.appGraphService.workflow$;
    }

    this.limeflow$.filter((flow : CytoscapeFlow) => flow !== null) //filter null values
      .subscribe((flow : CytoscapeFlow)=> {
          this.limeflow = flow;
          this.task = <NgLimeTask>this.limeflow.getTaskById(this.taskId);
          if (!this.task) {
            console.error(`${methodTrace} The workflow has not got a Task with the provided ID: ${this.taskId}.`);
            this.router.navigate(['/limeflow/lime-not-found', {componentType: 'Task', componentId: this.taskId}]);
          }
        });
  }

  onGetFlow(limeflow$ : BehaviorSubject<CytoscapeFlow>) {
    let methodTrace = `${this.constructor.name} > onGetFlow() > `; //for debugging

  }

  ngOnDestroy() {

  }

}