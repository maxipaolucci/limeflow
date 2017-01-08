import {Component, OnInit, Input} from '@angular/core';
import {CytoscapeInitialisationService} from "../../services/cytoscape-initialisation.service";
import CytoscapeFlow from "../../graphs/Cytoscape/CytoscapeFlow";
import Task from "../../../core/Task";
import {GraphService} from "../../services/graph.service";

@Component({
  selector: 'lime-flow',
  templateUrl: './limeFlow.component.html',
  styleUrls: ['./limeFlow.component.scss'],
  providers: [ GraphService, CytoscapeInitialisationService ]
})
export class LimeFlowComponent implements OnInit {

  private workFlow : CytoscapeFlow = null; //the graph model
  private data : any = null;

  constructor(private graphService : GraphService,
              private cytoscapeInitialisationService : CytoscapeInitialisationService) {}

  ngOnInit() {
    this.graphService.importGraphJSON('limeflow')
      .subscribe(
        //load json from a mocked graph
        (graphJSON : any) => {
          this.workFlow = new CytoscapeFlow(this.cytoscapeInitialisationService, 'workFlow', 'This is the workflow');
          this.workFlow.fromJSON(graphJSON).render();
          setTimeout(() => {
            this.workFlow.getTaskById('t1').setStatus(6);
          }, 3000);
          //just used to get a json model to save as mocks
          //this.data = this.workFlow.exportJSON();
          //console.log(this.data);
        },
        (error : any) =>  console.error(error)
      );

  }
}