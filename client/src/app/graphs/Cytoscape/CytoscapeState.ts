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
  public getCssStatusColor(status : number) : string {
    return CssStatusColors[Status[status]];
  }


  public receiveNotification(message: NotificationBox<Task>): void {
    super.receiveNotification(message);
    //this.render();
  }

  public toJSON() : any {
    return {
      data : {
        id: this._id,
        caption: this._name,
        status: this._status,
        cssStatusColor: this.getCssStatusColor(this._status),
        tasks : this.tasksToJSON()
      }
    };
  }

  public fromJSON(jsonDefinition : any) : CytoscapeState {
    this._id = jsonDefinition.data.id;
    this._name = jsonDefinition.data.caption;
    this._status = jsonDefinition.data.status;

    for (let task of jsonDefinition.data.tasks) {
      let t = new Task(task.id, task.required, task.name, task.description);
      t.setStatus(task.status);
      this.registerTask(t);
    }

    return this;
  }
}

export default CytoscapeState;
