/**
 * Created by Maxi Paolucci on 12/12/2016.
 */

import LimeFlow from "../../../core/LimeFlow";
import State from "../../../core/State";
import {CytoscapeInitialisationService} from "../../services/cytoscape-initialisation.service";
import NotificationBox from "../../../core/NotificationBox";
import NotificationCode from "../../../core/Constants/NotificationCode";
class CytoscapeFlow extends LimeFlow {

  private flowUI : any; //the graph UI (Cytoscape graph instance)
  private cytoscapeInitialisationService : CytoscapeInitialisationService;

  constructor(cytoscapeInitialisationService: CytoscapeInitialisationService, id : string, name : string, description? : string) {
    super(id, description);

    this.flowUI = null;
    this.cytoscapeInitialisationService = cytoscapeInitialisationService;
  }

  /**
   * Implementation of the abstract method of LimeFlow. This generates a json structure accepted by Cytoscape as elements.
   * @returns JSON . The cytoscape json object to generate a visual graph
   */
  public toJSON() : any {
    let uiElements : Array<any> = Array<any>();

    for (let state of this._states) {
      uiElements.push(state.toJSON());
    }

    for (let link of this._links) {
      uiElements.push(link.toJSON());
    }

    let config = {
      elements : uiElements, //add the elements from the model
      container: this.cytoscapeInitialisationService.initContainer(),
      style: this.cytoscapeInitialisationService.initStyleSheet(),
      layout: this.cytoscapeInitialisationService.initLayout()
    };

    return config;
  }

  /**
   * Returns the workflow UI instance
   * @returns {any}
   */
  public getFlowUI () {
    return this.flowUI;
  }

  public receiveNotification(message : NotificationBox<State>): void {
    super.receiveNotification(message);

    //if the notification is a Status changed then we update the color of the node
    if (message.getCode() === NotificationCode.StatusChanged) {
      let state = message.getObject();
      let stateUI = this.flowUI.getElementById(state.getId());

      stateUI.data(state.toJSON().data); //update UI Node data
      stateUI.style('background-color', stateUI.data('cssStatusColor'));
    }
    //this.render();
  }

  render() {
    this.flowUI = cytoscape(this.toJSON());

    // Initialize panzoom plugin
    this.flowUI.panzoom({});
    this.flowUI.userZoomingEnabled(false); //disable zoom by user events like mouse wheel

    // set color of states.
    this.flowUI.nodes().forEach(( stateUI ) => {
      stateUI.style('background-color', stateUI.data('cssStatusColor'));
    });

    //setTimeout(() => {
    //let nodeModel = <CytoscapeState>(this.workFlow.getElementById('s1', ElementType.Node));
    //console.log(nodeModel);
    //this.workFlowUI.elements('node#s1').style('background-color', '#ededed');
    //}, 3000);
  }
}

export default CytoscapeFlow;