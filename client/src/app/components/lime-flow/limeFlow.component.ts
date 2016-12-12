import { Component, OnInit } from '@angular/core';
import {CytoscapeInitialisationService} from "../../services/cytoscape-initialisation.service";
import CytoscapeFlow from "../../graphs/Cytoscape/Flow";
import CytoscapeState from "../../graphs/Cytoscape/State";
import CytoscapeLink from "../../graphs/Cytoscape/Link";


@Component({
  selector: 'lime-flow',
  templateUrl: './limeFlow.component.html',
  styleUrls: ['./limeFlow.component.scss'],
  providers: [ CytoscapeInitialisationService ]
})
export class LimeFlowComponent implements OnInit {

  private workFlow : CytoscapeFlow = null;

  constructor(private cytoscapeInitialisationService : CytoscapeInitialisationService) {}

  ngOnInit() {
    this.createLimeFlow();
  }

  createLimeFlow() {
    this.workFlow = new CytoscapeFlow('workFlow', 'This is the workflow');
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
  }

  ngAfterViewInit() {
    //We must render the graph here
    this.render();
  }

  render() {
    let config = {
      elements : this.workFlow.toJSON(),
      container: this.cytoscapeInitialisationService.initContainer(),
      style: this.cytoscapeInitialisationService.initStyleSheet(),
      layout: this.cytoscapeInitialisationService.initLayout()
    };
    cytoscape(config);
  }
}