import State from "../../../core/State";
import Task from "../../../core/Task";
import Status from "../../../core/Constants/ElementStatus";
import {CssStatusColors} from "../../css-colors";
import {Notification} from "rxjs";
import NotificationBox from "../../../core/NotificationBox";
/**
 * Created by Maxi Paolucci on 12/12/2016.
 */

class CytoscapeState extends State {

  constructor(id : string, name? : string, description? : string) {
    super(id, name, description);
  }

  /**
   * Get the css status color from a Status value
   * @param (Enum<Status>) status . The status of the node
   *
   * @returns {string} . The hexa value of the color
   */
  public getCssStatusColor(status : Status) : string {
    let cssStatusColor : string = CssStatusColors[Status[status]];

    return cssStatusColor;
  }

  public receiveNotification(message: NotificationBox<Task>): void {
    super.receiveNotification(message);
    //this.render();
  }

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
