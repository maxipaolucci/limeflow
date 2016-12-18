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

  private workFlow : CytoscapeFlow = null; //the graph model
  private workFlowUI : any = null; //the graph UI (Cytoscape graph instance)

  constructor(private cytoscapeInitialisationService : CytoscapeInitialisationService) {}

  ngOnInit() {
    this.createLimeFlow();
  }

  createLimeFlow() {
    this.workFlow = new CytoscapeFlow('workFlow', 'This is the workflow');
    let s1 = new CytoscapeState('s1', 'State 1 y laalsfds asdf asdfas asdfasdf asdf asdf');
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
    this.renderGraph();
  }

  renderGraph() {
    let config = {
      elements : this.workFlow.toJSON(), //add the elements from the model
      container: this.cytoscapeInitialisationService.initContainer(),
      style: this.cytoscapeInitialisationService.initStyleSheet(),
      layout: this.cytoscapeInitialisationService.initLayout()
    };
    this.workFlowUI = cytoscape(config);
    /**
     * Initialize panzoom plugin
     */
    this.workFlowUI.panzoom({});
    this.workFlowUI.userZoomingEnabled(false); //disable zoom by user events like mouse wheel
    console.log(this.workFlowUI.elements('node#s1').addClass('pepe maxi'));
  }
}