import { Component, OnInit } from '@angular/core';
import {CytoscapeInitialisationService} from "../../services/cytoscape-initialisation.service";
import CytoscapeFlow from "../../graphs/Cytoscape/CytoscapeFlow";
import CytoscapeState from "../../graphs/Cytoscape/CytoscapeState";
import CytoscapeLink from "../../graphs/Cytoscape/CytoscapeLink";
import Task from "../../../core/Task";


@Component({
  selector: 'lime-flow',
  templateUrl: './limeFlow.component.html',
  styleUrls: ['./limeFlow.component.scss'],
  providers: [ CytoscapeInitialisationService ]
})
export class LimeFlowComponent implements OnInit {

  private workFlow : CytoscapeFlow = null; //the graph model
  private t1 : Task = null;

  constructor(private cytoscapeInitialisationService : CytoscapeInitialisationService) {}

  ngOnInit() {
    this.createLimeFlow();
  }

  ngAfterViewInit() {
    //We must render the graph here
    this.workFlow.render();
    setTimeout(() => {
      this.t1.setStatus(6);
    }, 3000);
  }

  createLimeFlow() {
    this.workFlow = new CytoscapeFlow(this.cytoscapeInitialisationService, 'workFlow', 'This is the workflow');
    let s1 = new CytoscapeState('s1', 'State 1');
    let s2 = new CytoscapeState('s2', 'State 2');
    let s3 = new CytoscapeState('s3', 'State 3');
    this.workFlow.addState(s1);
    this.workFlow.addState(s2);
    this.workFlow.addState(s3);
    let l1 = new CytoscapeLink('l1', s1, s2);
    let l2 = new CytoscapeLink('l2', s2, s3, 'Link from State 2 to State 3');
    this.workFlow.addLink(l1);
    this.workFlow.addLink(l2);

    this.t1 = new Task('t1', true, 'Tarea 1', 'Description for task 1');
    let t2 = new Task('t2', true, 'Tarea 2', 'Description for task 2');
    let t3 = new Task('t3', true, 'Tarea 3', 'Description for task 3');

    s1.registerTask(this.t1);
    s2.registerTask(t2);
    s2.registerTask(t3);
  }
}