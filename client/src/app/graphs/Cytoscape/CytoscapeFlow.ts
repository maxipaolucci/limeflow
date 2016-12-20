/**
 * Created by Maxi Paolucci on 12/12/2016.
 */

import LimeFlow from "../../../core/LimeFlow";
import {CytoscapeInitialisationService} from "../../services/cytoscape-initialisation.service";
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
    let elementsArr : Array<any> = Array<any>();

    for (let state of this._states) {
      elementsArr.push(state.toJSON());
    }

    for (let link of this._links) {
      elementsArr.push(link.toJSON());
    }

    let config = {
      elements : elementsArr, //add the elements from the model
      container: this.cytoscapeInitialisationService.initContainer(),
      style: this.cytoscapeInitialisationService.initStyleSheet(),
      layout: this.cytoscapeInitialisationService.initLayout()
    };

    return config;
  }

  public getUI () {
    return this.flowUI;
  }

  public receiveNotification<T>(message: string): void {
    super.receiveNotification(message);
    this.render();
  }

  render() {
    this.flowUI = cytoscape(this.toJSON());

    // Initialize panzoom plugin
    this.flowUI.panzoom({});
    this.flowUI.userZoomingEnabled(false); //disable zoom by user events like mouse wheel

    // set color of states.
    this.flowUI.nodes().forEach(( ele ) => {
      ele.style('background-color', ele.data('cssStatusColor'));
    });

    //setTimeout(() => {
    //let nodeModel = <CytoscapeState>(this.workFlow.getElementById('s1', ElementType.Node));
    //console.log(nodeModel);
    //this.workFlowUI.elements('node#s1').style('background-color', '#ededed');
    //}, 3000);
  }
}

export default CytoscapeFlow;