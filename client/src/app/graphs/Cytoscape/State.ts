import State from "../../../core/State";
/**
 * Created by Maxi Paolucci on 12/12/2016.
 */

class CytoscapeState extends State {

  constructor(id : string, name? : string, description? : string) {
    super(id, name, description);
  }

  public toJSON() : any {
    return {
      data : {
        id: this._id,
        caption: this._name
      }
    };
  }
}

export default CytoscapeState;
