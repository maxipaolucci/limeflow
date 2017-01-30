import {Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import CytoscapeFlow from "../../ng-core/CytoscapeFlow";
import Status from "../../../../core/Constants/ElementStatus";
import {CommonGraphService} from "../../services/common-graph.service";
import {GraphService} from "../../services/graph.service";
import {Router, ActivatedRoute} from "@angular/router";
import {BehaviorSubject} from "rxjs/Rx";


@Component({
  selector: 'lime-flow',
  templateUrl: './lime-flow.component.html',
  styleUrls: ['./lime-flow.component.scss'],
  //providers: [ GraphService ]
})
export class LimeFlowComponent implements OnInit, OnDestroy {

  componentId : string = null; //the component id
  private limeflow : CytoscapeFlow; //the graph model
  private limeflow$ : BehaviorSubject<CytoscapeFlow>;
  private statusColor : string;
  private data : any = null;
  @Input() filename : string;
  @Input() render : boolean = true;
  @Output() getflow : EventEmitter<BehaviorSubject<CytoscapeFlow>>;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private graphService : GraphService,
      private commonGraphService : CommonGraphService) {

    this.componentId = `limeFlow_${commonGraphService.getNextGraphId()}`;
    this.statusColor = CommonGraphService.getCssStatusColor(Status.New);
    this.limeflow = null;
    this.limeflow$ = new BehaviorSubject<CytoscapeFlow>(null); //initialize with null
    this.getflow = new EventEmitter<BehaviorSubject<CytoscapeFlow>>();
  }

  ngOnInit() {
    let methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging

    this.getflow.emit(this.limeflow$); //emit the limeflow Observable
    //import from file
    this.commonGraphService.importGraphJSON(this.filename)
      .subscribe(
        //load json from a mocked graph
        (graphJSON : any) => {
          //create a new CytoscapeFlow and render it.
          this.limeflow = new CytoscapeFlow(this.componentId, this.render, null);
          this.limeflow.fromJSON(graphJSON);

          if (this.render) {
            this.limeflow.render();
          }

          //set the workflow to the GraphService
          this.graphService.setWorkFlow(this.limeflow);
          //notify observers about the new limeflow loaded from JSON file.
          this.limeflow$.next(this.limeflow);

          //Subscribe to the flowStatus$ to receive updates on workflow status changes
          this.limeflow.flowStatus$.subscribe((newStatus : number) => {
            this.statusColor = CommonGraphService.getCssStatusColor(newStatus);
          });

          // Subscribe to the selectedStateId Observer to receive updatos on the state clicked and show its content.
          // We do this navigation here because the click event occurs in the CytoscapeFlow object
          // with no router instance.
          this.limeflow.selectedStateId$.subscribe((stateId : string) => {
            this.router.navigate(['/limeflow/state', stateId]);
          });

          setTimeout(() => {
            this.limeflow.getTaskById('t1').setStatus(3);
          }, 3000);
          //just used to get a json model to save as mocks
          //this.data = this.workFlow.exportAsJSON();
          //console.log(this.data);

        },
        (error : any) =>  console.error(`${methodTrace} There was an error trying to load file: ${this.filename} > ${error}`)
      );
  }

  ngOnDestroy() {
    //unsubscribe from observers
    this.limeflow.flowStatus$.unsubscribe();
    this.limeflow.selectedStateId$.unsubscribe();
  }
}
