import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {CytoscapeInitialisationService} from "./services/cytoscape-initialisation.service";
import CytoscapeFlow from "./cytoscape-core/CytoscapeFlow";
import Status from "../../core/Constants/ElementStatus";
import {CytoscapeEventsService} from "./services/cytoscape-events.service";
import {CommonGraphService} from "./services/common-graph.service";
import {GraphService} from "./services/graph.service";

@Component({
  selector: 'lime-flow',
  templateUrl: './limeFlow.component.html',
  styleUrls: ['./limeFlow.component.scss'],
  providers: [ GraphService, CytoscapeInitialisationService, CytoscapeEventsService ]
})
export class LimeFlowComponent implements OnInit, OnDestroy {

  componentId : string = null; //the component id
  private workFlow : CytoscapeFlow = null; //the graph model
  private statusColor : string = null;
  private selectedStateId : string = null;
  private data : any = null;

  constructor(private graphService : GraphService,
              private commonGraphService : CommonGraphService,
              private cytoscapeInitialisationService : CytoscapeInitialisationService,
              private cytoscapeEventsService : CytoscapeEventsService) {

    this.componentId = `limeFlow_${commonGraphService.getNextGraphId()}`;
    this.statusColor = commonGraphService.getCssStatusColor(Status.New);
  }

  ngOnInit() {
    this.commonGraphService.importGraphJSON('limeflow')
      .subscribe(
        //load json from a mocked graph
        (graphJSON : any) => {
          //create a new CytoscapeFlow and render it.
          this.workFlow = new CytoscapeFlow(
            this.commonGraphService,
            this.cytoscapeInitialisationService,
            this.cytoscapeEventsService, this.componentId, 'workFlow', 'This is the workflow');
          this.workFlow.fromJSON(graphJSON).render();

          //set the workflow to the GraphService
          this.graphService.setWorkFlow(this.workFlow);

          //Subscribe to the flowStatusSource to receive updates on workflow status changes
          this.workFlow.flowStatusSource.subscribe((newStatus : number) => {
            this.statusColor = this.commonGraphService.getCssStatusColor(newStatus);
          });

          this.workFlow.selectedStateId$.subscribe((stateId : string) => {
            this.selectedStateId = stateId;
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

  ngOnDestroy() {
    //unsubscribe from observers
    this.workFlow.flowStatusSource.unsubscribe();
    this.workFlow.selectedStateId$.unsubscribe();
  }
}
