import {Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import {CytoscapeInitialisationService} from "./services/cytoscape-initialisation.service";
import CytoscapeFlow from "./ng-core/CytoscapeFlow";
import Status from "../../core/Constants/ElementStatus";
import {CytoscapeEventsService} from "./services/cytoscape-events.service";
import {CommonGraphService} from "./services/common-graph.service";
import {GraphService} from "./services/graph.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {BehaviorSubject} from "rxjs/Rx";


@Component({
  selector: 'lime-flow',
  templateUrl: './lime-flow.component.html',
  styleUrls: ['./lime-flow.component.scss'],
  providers: [ GraphService, CytoscapeInitialisationService, CytoscapeEventsService ]
})
export class LimeFlowComponent implements OnInit, OnDestroy {

  componentId : string = null; //the component id
  private limeflow : CytoscapeFlow; //the graph model
  private limeflow$ : BehaviorSubject<CytoscapeFlow>;
  private statusColor : string;
  private data : any = null;
  @Input() filename : string;
  @Input() render : boolean;
  @Output() getflow : EventEmitter<BehaviorSubject<CytoscapeFlow>>;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private graphService : GraphService,
      private commonGraphService : CommonGraphService,
      private cytoscapeInitialisationService : CytoscapeInitialisationService,
      private cytoscapeEventsService : CytoscapeEventsService) {

    this.componentId = `limeFlow_${commonGraphService.getNextGraphId()}`;
    this.statusColor = commonGraphService.getCssStatusColor(Status.New);
    this.limeflow = null;
    this.limeflow$ = new BehaviorSubject<CytoscapeFlow>(null); //initialize with null
    this.getflow = new EventEmitter<BehaviorSubject<CytoscapeFlow>>();
  }

  ngOnInit() {
    let methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging
    console.log(this.filename, this.render);
    this.getflow.emit(this.limeflow$); //emit the limeflow Observable
    this.commonGraphService.importGraphJSON('limeflow')
      .subscribe(
        //load json from a mocked graph
        (graphJSON : any) => {
          //create a new CytoscapeFlow and render it.
          this.limeflow = new CytoscapeFlow(
            this.commonGraphService,
            this.cytoscapeInitialisationService,
            this.cytoscapeEventsService, this.componentId, this.render, null);
          this.limeflow.fromJSON(graphJSON);

          if (this.render) {
            this.limeflow.render();
          }

          //notify observers about the new limeflow loaded from JSON file.
          this.limeflow$.next(this.limeflow);

          //set the workflow to the GraphService
          this.graphService.setWorkFlow(this.limeflow);

          //Subscribe to the flowStatusSource to receive updates on workflow status changes
          this.limeflow.flowStatusSource.subscribe((newStatus : number) => {
            this.statusColor = this.commonGraphService.getCssStatusColor(newStatus);
          });

          // Subscribe to the selectedStateId Observer to receive updatos on the state clicked and show its content.
          // We do this navigation here because the click event occurs in the CytoscapeFlow object
          // with no router instance.
          this.limeflow.selectedStateId$.subscribe((stateId : string) => {
            this.router.navigate(['/limeflow/state', stateId]);
          });

          // Check the url for an optional stateId parameter and redirect to that state. This stateId param (optional)
          // is present when the user is navigating directly to a state by URL. As the workflow is not created yet then
          // the state component redirect to the limeflow component with this optional parameter to create a workflow
          // and redirect the user to the state that he was looking for from the beginning.
          // Use snapshot (no-observable alternative) because this parameter is going to be read once from the URL when
          // the user is redirected from the state component to the limeflow one to create it.
          if (this.route.snapshot.params['stateId']) {
            if (this.route.snapshot.params['taskId']) {
              console.info(`${methodTrace} Optional taskId param provided: ${this.route.snapshot.params['taskId']}. Navigating to that task...`);
              this.router.navigate(['/limeflow/state', this.route.snapshot.params['stateId'], 'task', this.route.snapshot.params['taskId']]);
            } else {
              console.info(`${methodTrace} Optional stateId param provided: ${this.route.snapshot.params['stateId']}. Navigating to that state...`);
              this.router.navigate(['/limeflow/state', this.route.snapshot.params['stateId']]);
            }
          }

          setTimeout(() => {
            this.limeflow.getTaskById('t1').setStatus(3);
          }, 3000);
          //just used to get a json model to save as mocks
          //this.data = this.workFlow.exportAsJSON();
          //console.log(this.data);

        },
        (error : any) =>  console.error(`${methodTrace} ${error}`)
      );
  }

  ngOnDestroy() {
    //unsubscribe from observers
    this.limeflow.flowStatusSource.unsubscribe();
    this.limeflow.selectedStateId$.unsubscribe();
  }
}
