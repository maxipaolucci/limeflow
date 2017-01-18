/**
 * Created by mpaoluc on 13/01/2017.
 */
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import NgLimeTask from "../../../lime-flow/ng-core/NgLimeTask";

@Component({
  template: '<h2>{{ngLimeTask.getName()}}</h2>'
})
export class T1Component {

  private ngLimeTask : NgLimeTask;

  constructor(private route: ActivatedRoute) {
    this.ngLimeTask = null;
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      console.dir(params['task']);
      this.ngLimeTask = <NgLimeTask>params['task'];
      if (!this.ngLimeTask) {
        console.log('ngLimeTask not received')
        // console.error(`${methodTrace} The workflow has not got a State with the provided ID: ${params['stateId']}.`);
        // this.router.navigate(['/limeflow/lime-not-found', {componentType : 'State', componentId : params['stateId']}] );
      } else {
        console.log(this.ngLimeTask);
      }
    });
  }

}