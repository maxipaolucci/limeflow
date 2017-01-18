import State from "../../../core/State";
import Task from "../../../core/Task";
import NotificationBox from "../../../core/NotificationBox";
import {CommonGraphService} from "../services/common-graph.service";
import NgLimeTask from "./NgLimeTask";
/**
 * Created by Maxi Paolucci on 12/12/2016.
 */

class CytoscapeState extends State {

  constructor(private commonGraphService : CommonGraphService, id : string, name? : string, description? : string) {
    super(id, name, description);
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
        cssStatusColor: this.commonGraphService.getCssStatusColor(this._status),
        tasks : this.tasksToJSON()
      }
    };
  }

  public fromJSON(jsonDefinition : any) : CytoscapeState {
    this._id = jsonDefinition.data.id;
    this._name = jsonDefinition.data.caption;
    this._status = jsonDefinition.data.status;

    for (let task of jsonDefinition.data.tasks) {
      let t = new NgLimeTask(task.id, task.required, task.name, task.description);
      t.setStatus(task.status);
      t.setUrlToComponent(task.urlToComponent);
      this.registerTask(t);
    }

    return this;
  }
}

export default CytoscapeState;
