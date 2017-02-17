/**
 * Created by mpaoluc on 13/01/2017.
 */
import {Component, OnInit, OnDestroy} from '@angular/core';
import NgLimeTask from "../../../lime-flow/ng-core/NgLimeTask";
import CytoscapeFlow from "../../../lime-flow/ng-core/CytoscapeFlow";
import {BehaviorSubject, Subscription} from "rxjs";
import {AppGraphService} from "../../../services/app.graph.service";
import {Router} from "@angular/router";
import {CommonGraphService} from "../../../lime-flow/services/common-graph.service";
import Status from "../../../../core/Constants/ElementStatus";
import {UIStatusInfo} from "../../../css-colors";
import {AppCommonService} from "../../../services/app.common.service";

@Component({
  selector: 'task-t1',
  templateUrl: '../tasks.component.html',
  styleUrls: ['../tasks.component.scss']
})
export class T1Component implements OnInit, OnDestroy {

  private taskId : string = 't1';
  private task : NgLimeTask;
  private taskStatus : number;
  private limeflow : CytoscapeFlow;
  private limeflow$ : BehaviorSubject<CytoscapeFlow>;
  private limeflowSubscriber : Subscription;
  private taskStatuses : any;
  private getUIStatusInfo : any;

  constructor(
      private appGraphService : AppGraphService,
      private appCommonService : AppCommonService,
      private router: Router
  ) {
    this.limeflow$ = null;
    this.limeflow = null;
    this.task = null;
    this.taskStatus = Status.New;
    this.taskStatuses = Object.keys(UIStatusInfo);
    this.getUIStatusInfo = CommonGraphService.getUIStatusInfo;
  }

  ngOnInit() {
    let methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging

    this.limeflow = this.appGraphService.getFlow();
    if (this.limeflow) {
      this.limeflow$ = new BehaviorSubject<CytoscapeFlow>(this.limeflow);
    } else {
      this.limeflow$ = <BehaviorSubject<CytoscapeFlow>>this.appGraphService.getFlow$();
    }

    this.limeflowSubscriber = this.limeflow$.filter((flow : CytoscapeFlow) => flow !== null) //filter null values
      .subscribe((flow : CytoscapeFlow)=> {
          this.limeflow = flow;
          this.task = <NgLimeTask>this.limeflow.getTaskById(this.taskId);
          if (!this.task) {
            console.error(`${methodTrace} The workflow has not got a Task with the provided ID: ${this.taskId}.`);
            this.router.navigate(['/limeflow/lime-not-found', {componentType: 'Task', componentId: this.taskId}]);
          } else {
            this.taskStatus = this.task.getStatus();
          }
        });
  }

  ngOnDestroy() {
    this.limeflowSubscriber.unsubscribe();
  }



}