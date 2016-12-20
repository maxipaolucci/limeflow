import State from "../../../core/State";
import Status from "../../../core/Constants/Status";
import {CssStatusColors} from "../../css-colors";
/**
 * Created by Maxi Paolucci on 12/12/2016.
 */

class CytoscapeState extends State {

  constructor(id : string, name? : string, description? : string) {
    super(id, name, description);
  }

  /**
   * Get the css status color from a Status value
   * @returns {string}
   */
  public getCssStatusColor(status : Status) : string {
    let cssStatus : string = null;

    switch(status) {
      case Status.New:
        cssStatus = CssStatusColors.New;
        break;

      case Status.InProgress:
        cssStatus = CssStatusColors.InProgress;
        break;

      case Status.Done:
        cssStatus = CssStatusColors.Done;
        break;

      case Status.Complete:
        cssStatus = CssStatusColors.Complete;
        break;

      case Status.Stop:
        cssStatus = CssStatusColors.Stop;
        break;

      case Status.Block:
        cssStatus = CssStatusColors.Block;
        break;

      default:
        cssStatus = CssStatusColors.New;
    }

    return cssStatus;
  }

  // public updateStatus() : any {
  //   super.updateStatus();
  //   return this.toJSON();
  // }

  public toJSON() {
    return {
      data : {
        id: this._id,
        caption: this._name,
        status: this._status,
        cssStatusColor: this.getCssStatusColor(this._status)
      }
    };
  }
}

export default CytoscapeState;
