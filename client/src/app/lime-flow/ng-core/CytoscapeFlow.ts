/**
 * Created by Maxi Paolucci on 12/12/2016.
 */
import LimeFlow from "../../../core/LimeFlow";
import State from "../../../core/State";
import {CytoscapeInitialisationService} from "../services/cytoscape-initialisation.service";
import NotificationBox from "../../../core/NotificationBox";
import NotificationCode from "../../../core/Constants/NotificationCode";
import CytoscapeState from "./CytoscapeState";
import CytoscapeLink from "./CytoscapeLink";
import Status from "../../../core/Constants/ElementStatus";
import {Subject} from "rxjs";
import {CytoscapeEventsService} from "../services/cytoscape-events.service";
import {CommonGraphService} from "../services/common-graph.service";


class CytoscapeFlow extends LimeFlow {

  private flowUI : any; //the graph UI instance (Cytoscape graph instance)
  private cytoscapeConfigObj : any; //the cytoscape configuration object
  flowStatusSource : Subject<number> = new Subject<number>(); //Observable that handles the workflow status
  selectedStateId$ : Subject<string> = new Subject<string>(); //the selected state when the user clicks on a graph node

  constructor(private commonGraphService : CommonGraphService,
              private cytoscapeInitialisationService : CytoscapeInitialisationService,
              private cytoscapeEventsService : CytoscapeEventsService,
              id : string, name : string, description? : string) {
    super(id, name, description);

    this.cytoscapeConfigObj = null;
    this.flowUI = null;
    this.flowStatusSource.next(Status.New);
  }

  /**
   * Implementation of the abstract method of LimeFlow.
   * This generates a Cytoscape graph instanse from json definition of a cytoscape graph.
   * @returns CytoscapeFlow . The cytoscape flow instance.
   */
  fromJSON(jsonDefinition : any) : CytoscapeFlow {
    this.cytoscapeConfigObj = jsonDefinition;

    //Set Limeflow properties
    if (jsonDefinition.limeflowData) {
      this.setName(jsonDefinition.limeflowData.name);
      this.setDescription(jsonDefinition.limeflowData.description);
      this.setStatus(jsonDefinition.limeflowData.status);
    }

    //Create Limeflow States
    let nodes : Array<any> = jsonDefinition.elements.nodes;
    for (let node of nodes) {
      let state = new CytoscapeState(this.commonGraphService, node.data.id, node.data.caption);
      this.addState(state.fromJSON(node));
    }

    //Create Limeflow Links
    let edges : Array<any> = jsonDefinition.elements.edges;
    for (let edge of edges) {
      let link = new CytoscapeLink(edge.data.id,
        <CytoscapeState>this.getStateById(edge.data.source),
        <CytoscapeState>this.getStateById(edge.data.target), edge.data.caption);
      this.addLink(link);
    }

    return this;
  }

  /**
   * Implementation of the abstract method of LimeFlow.
   * Generates a JSON definition of the Limeflow instance.
   * The generated JSON structure is written in a format accepted by Cytoscape
   * as the main config object.
   * @returns JSON . The cytoscape json object to generate a visual graph.
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

    //set the HTML container
    config.container = this.cytoscapeInitialisationService.initContainer(this.getId());

    return config;
  }

  /**
   * Returns the workflow UI instance
   * @returns {any}
   */
  getFlowUI() : any {
    return this.flowUI;
  }

  /**
   * This is the implementation of the observer method this class implements.
   * @param message : NotificationBox<State> . A package observables shares in Limeflow
   */
  receiveNotification(message : NotificationBox<State>): void {
    super.receiveNotification(message);
    this.flowStatusSource.next(this.getStatus());

    //if the notification is a Status changed then we update the color of the node
    if (message.getCode() === NotificationCode.StatusChanged) {
      let state : State = message.getObject();
      let stateUI : any = this.flowUI.getElementById(state.getId());

      stateUI.json(state.toJSON()); //update UI Node data
      stateUI.style('background-color', stateUI.data('cssStatusColor'));
    }
  }

  /**
   * Renders the graph in the screen.
   */
  render() : void {
    this.flowUI = cytoscape(this.toJSON());

    // Initialize panzoom plugin
    this.flowUI.panzoom({});
    this.flowUI.userZoomingEnabled(false); //disable zoom by user events like mouse wheel

    //set event listeners
    this.cytoscapeEventsService.nodeClick(this);

    // set color of states.
    this.flowUI.nodes().forEach(( stateUI ) => {
      stateUI.style('background-color', stateUI.data('cssStatusColor'));
    });
  }

  /**
   * Generates a json object of the graph rendered in the screen at the moment.
   * This JSON object has the cytoscape JSON structure with some additional data for Limeflow.
   * @returns any . The JSOM of the graph.
   */
  exportAsJSON() : any {
    let jsonDefinition = this.flowUI.json();
    jsonDefinition.limeflowData = {
      name : this.getName(),
      description : this.getDescription(),
      status : this.getStatus(),
      id : this.getId()
    };
    return jsonDefinition;
  }

  /**
   * Displays the information contained in this state
   * @param stateID . The id of the state to open.
   */
  selectState(stateId : string) : void {
    this.selectedStateId$.next(stateId);
  }
}

export default CytoscapeFlow;