import {Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import CytoscapeFlow from "./ng-core/CytoscapeFlow";
import Status from "../../core/Constants/ElementStatus";
import {CommonGraphService} from "./services/common-graph.service";
import {GraphService} from "./services/graph.service";
import {Router, ActivatedRoute} from "@angular/router";
import {BehaviorSubject, Subscription} from "rxjs/Rx";


@Component({
  selector: 'lime-flow',
  templateUrl: './lime-flow.component.html',
  styleUrls: ['./lime-flow.component.scss']
})
export class LimeFlowComponent implements OnInit, OnDestroy {

  @Input() id : string;
  @Input() filename : string;
  @Input() render : boolean = true;
  @Output() getflow : EventEmitter<BehaviorSubject<CytoscapeFlow>>;

  private limeflow : CytoscapeFlow; //the graph model
  private statusColor : string;
  private limeflowStatusSubscriber : Subscription;
  private limeflowStateIdSubscriber : Subscription;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private graphService : GraphService,
      private commonGraphService : CommonGraphService) {

    this.statusColor = CommonGraphService.getCssStatusColor(Status.New);
    this.limeflow = null;
    this.getflow = new EventEmitter<BehaviorSubject<CytoscapeFlow>>();
    this.limeflowStateIdSubscriber = null;
    this.limeflowStatusSubscriber = null;
  }

  ngOnInit() {
    let methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging

    this.graphService.registerWorkflow(this.id, null);
    this.getflow.emit(this.graphService.getWorkflow$(this.id)); //emit the limeflow Observable
    //import from file
    this.commonGraphService.importGraphJSON(this.filename)
      .map(
        //load json from a mocked graph
        (graphJSON : any) => {
          //create a new CytoscapeFlow and render it.
          let flow : CytoscapeFlow = new CytoscapeFlow(this.id, this.render, null);
          flow.fromJSON(graphJSON);

          if (this.render) {
            flow.render();
          }

          //set the workflow to the GraphService and notify observers to the graphservice workflow$
          console.log(this.id);
          this.graphService.setWorkflow(this.id, flow);

          return flow;
        }
      ).subscribe(flow => {
        this.limeflow = flow;
        //Subscribe to the flowStatus$ to receive updates on workflow status changes
        this.limeflowStatusSubscriber = this.limeflow.flowStatus$.subscribe((newStatus : number) => {
          this.statusColor = CommonGraphService.getCssStatusColor(newStatus);
        });

        // Subscribe to the selectedStateId Observer to receive updatos on the state clicked and show its content.
        // We do this navigation here because the click event occurs in the CytoscapeFlow object
        // with no router instance.
        this.limeflowStateIdSubscriber = this.limeflow.selectedStateId$.subscribe((stateId : string) => {
          this.router.navigate(['/', this.id, 'state', stateId]);
        });

        setTimeout(() => {
          this.limeflow.getTaskById('t1').setStatus(3);
        }, 3000);
        //just used to get a json model to save as mocks
        //this.data = this.workFlow.exportAsJSON();
        //console.log(this.data);
      }
      , (error : any) =>  console.error(`${methodTrace} There was an error trying to load file: ${this.filename} > ${error}`));
  }

  ngOnDestroy() {
    let methodTrace = `${this.constructor.name} > ngOnDestroy() > `; //for debugging
    console.info(`${methodTrace} Method called`);
    //unsubscribe from observers
    this.limeflowStatusSubscriber.unsubscribe();
    this.limeflowStateIdSubscriber.unsubscribe();
  }
}
