/**
 * Created by Maxi Paolucci on 12/12/2016.
 */

import LimeFlow from "../../../core/LimeFlow";
import State from "../../../core/State";
import {CytoscapeInitialisationService} from "../../services/cytoscape-initialisation.service";
import NotificationBox from "../../../core/NotificationBox";
import NotificationCode from "../../../core/Constants/NotificationCode";
import CytoscapeState from "./CytoscapeState";
import CytoscapeLink from "./CytoscapeLink";
class CytoscapeFlow extends LimeFlow {

  private flowUI : any; //the graph UI (Cytoscape graph instance)
  private cytoscapeConfigObj : any;
  private cytoscapeInitialisationService : CytoscapeInitialisationService;

  constructor(cytoscapeInitialisationService: CytoscapeInitialisationService, id : string, name : string, description? : string) {
    super(id, description);

    this.flowUI = null;
    this.cytoscapeConfigObj = null;
    this.cytoscapeInitialisationService = cytoscapeInitialisationService;
  }

  fromJSON(jsonDefinition : any) : CytoscapeFlow {
    this.cytoscapeConfigObj = jsonDefinition;

    let nodes : Array<any> = jsonDefinition.elements.nodes;
    let edges : Array<any> = jsonDefinition.elements.edges;

    for (let node of nodes) {
      let state = new CytoscapeState(node.data.id, node.data.caption);
      this.addState(state.fromJSON(node));
    }

    for (let edge of edges) {
      let link = new CytoscapeLink(edge.data.id,
        <CytoscapeState>this.getStateById(edge.data.source),
        <CytoscapeState>this.getStateById(edge.data.target), edge.data.caption);
      this.addLink(link);
    }

    return this;
  }

  /**
   * Implementation of the abstract method of LimeFlow. This generates a json structure accepted by Cytoscape as elements.
   * @returns JSON . The cytoscape json object to generate a visual graph
   */
  toJSON() : any {
    let config : any = {};
    if (this.cytoscapeConfigObj) {
      config = this.cytoscapeConfigObj;
      config.layout = this.cytoscapeInitialisationService.setLayout('preset');
    } else {
      let uiElements : Array<any> = Array<any>();

      for (let state of this._states) {
        uiElements.push(state.toJSON());
      }

      for (let link of this._links) {
        uiElements.push(link.toJSON());
      }

      config.elements = uiElements;
      config.layout = this.cytoscapeInitialisationService.initLayout();
    }
    config.container = this.cytoscapeInitialisationService.initContainer();

    return config;
  }

  /**
   * Returns the workflow UI instance
   * @returns {any}
   */
  getFlowUI () {
    return this.flowUI;
  }

  receiveNotification(message : NotificationBox<State>): void {
    super.receiveNotification(message);

    //if the notification is a Status changed then we update the color of the node
    if (message.getCode() === NotificationCode.StatusChanged) {
      let state : State = message.getObject();
      let stateUI : any = this.flowUI.getElementById(state.getId());

      stateUI.json(state.toJSON()); //update UI Node data
      stateUI.style('background-color', stateUI.data('cssStatusColor'));
    }
  }

  render() : void {
    this.flowUI = cytoscape(this.toJSON());

    // Initialize panzoom plugin
    this.flowUI.panzoom({});
    this.flowUI.userZoomingEnabled(false); //disable zoom by user events like mouse wheel

    // set color of states.
    this.flowUI.nodes().forEach(( stateUI ) => {
      stateUI.style('background-color', stateUI.data('cssStatusColor'));
    });
  }

  /**
   * Export the cytoscape graph in json format
   * @returns {string|any}
   */
  cyToJSON() : any {
    return this.flowUI.json();
  }
}

export default CytoscapeFlow;