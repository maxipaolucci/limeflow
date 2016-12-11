/**
 * Created by Maxi Paolucci on 12/12/2016.
 */

import LimeFlow from "../../../core/LimeFlow";
class CytoscapeFlow extends LimeFlow {

  constructor(id : string, name : string, description? : string) {
    super(id, description);
  }

  public toJSON() : any {
    let elementsArr : Array<any> = Array<any>();

    for (let state of this._states) {
      elementsArr.push(state.toJSON());
    }

    for (let link of this._links) {
      elementsArr.push(link.toJSON());
    }

    return elementsArr;
  }
}

export default CytoscapeFlow;