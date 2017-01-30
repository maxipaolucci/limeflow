import {Component, Input, Output, EventEmitter} from "@angular/core";
import {BehaviorSubject} from "rxjs/Rx";
import CytoscapeFlow from "./ng-core/CytoscapeFlow";

@Component({
  selector : 'lime-flow-app',
  templateUrl './lime-flow-app.html',
  styleUrls: ['./lime-flow-app.scss']
})
export class LimeFlowAppComponent {
  @Input() filename : string;
  @Input() render : boolean = true;
  @Output() getflow : EventEmitter<BehaviorSubject<CytoscapeFlow>>;

  constructor() {
    this.getflow = new EventEmitter<BehaviorSubject<CytoscapeFlow>>();
  }

  onGetFlow(limeflow$ : BehaviorSubject<CytoscapeFlow>) {
    this.getflow.emit(limeflow$);
  }
}