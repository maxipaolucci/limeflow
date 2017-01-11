import {Component, OnInit} from '@angular/core';
import {CytoscapeInitialisationService} from "../../services/cytoscape-initialisation.service";
import CytoscapeFlow from "../../cytoscape-core/CytoscapeFlow";
import {GraphService} from "../../services/graph.service";
import Status from "../../../core/Constants/ElementStatus";
import {CytoscapeEventsService} from "../../services/cytoscape-events.service";

@Component({
  selector: 'lime-flow',
  templateUrl: './limeFlow.component.html',
  styleUrls: ['./limeFlow.component.scss'],
  providers: [ GraphService, CytoscapeInitialisationService, CytoscapeEventsService ]
})
export class LimeFlowComponent implements OnInit {

  private workFlow : CytoscapeFlow = null; //the graph model
  private statusColor : string = null;
  private data : any = null;

  constructor(private graphService : GraphService,
              private cytoscapeInitialisationService : CytoscapeInitialisationService,
              private cytoscapeEventsService : CytoscapeEventsService) {

    this.statusColor = graphService.getCssStatusColor(Status.New);
  }

  ngOnInit() {
    this.graphService.importGraphJSON('limeflow')
      .subscribe(
        //load json from a mocked graph
        (graphJSON : any) => {
          //create a new CytoscapeFlow and render it.
          this.workFlow = new CytoscapeFlow(
              this.graphService,
              this.cytoscapeInitialisationService,
              this.cytoscapeEventsService, 'workFlow', 'This is the workflow');
          this.workFlow.fromJSON(graphJSON).render();

          //Subscribe to the flowStatusSource to receive updates on workflow status changes
          this.workFlow.flowStatusSource.subscribe((newStatus : number) => {
            this.statusColor = this.graphService.getCssStatusColor(newStatus);
          });

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