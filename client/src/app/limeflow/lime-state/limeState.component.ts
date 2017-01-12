import {Component, OnInit, Input} from "@angular/core";
import {GraphService} from "../services/graph.service";
import CytoscapeState from "../cytoscape-core/CytoscapeState";

/**
 * Created by Maxi Paolucci on 11/01/2017.
 */
@Component({
  selector: 'lime-state',
  templateUrl: './limeState.component.html',
  styleUrls: ['./limeState.component.scss'],
})
export class LimeStateComponent implements OnInit {

  private state : CytoscapeState;
  @Input() stateId : string;

  constructor(private graphService : GraphService) {}

  ngOnInit() : void {
    if (this.stateId) {
      this.state = <CytoscapeState>this.graphService.getWorkflow().getStateById(this.stateId);
      console.log(this.state);
    } else {
      console.error(`LimeStateComponent > OnInit() > stateId must not be null.`);
    }
  }

}