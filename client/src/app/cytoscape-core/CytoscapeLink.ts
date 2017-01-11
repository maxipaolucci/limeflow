/**
 * Created by Maxi Paolucci on 12/12/2016.
 */
import Link from "../../core/Link";
import CytoscapeState from "./CytoscapeState";

class CytoscapeLink extends Link {

  constructor(id : string, origin : CytoscapeState, destiny : CytoscapeState, caption? : string) {
    super(id, origin, destiny, caption);
  }

  public toJSON() : any {
    return {
      data : {
        id : this._id,
        source: this._origin.getId(),
        target: this._destiny.getId(),
        caption: this._caption || ''
      }
    }
  }
}

export default CytoscapeLink;