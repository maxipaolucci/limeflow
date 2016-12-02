import IState from "./Interfaces/IState";
import Status from "./Constants/Status";
import Link from "./Link";
import Task from "./Task";
/**
 * Created by Maxi Paolucci on 27/11/2016.
 */


class State implements IState {

  private _id : string = null;
  private _name : string;
  private _description : string;
  private _initial : boolean;
  private _final : boolean;
  private _status : number;
  private _inputs : Array<Link>;
  private _outputs : Array<Link>;
  private _tasks : Array<Task>;

  constructor(id : string, name? : string, description? : string) {
    this._id = id;
    this._name = name || null;
    this._description = description || null;
    this._initial = false;
    this._final = false;
    this._status = Status.Empty;
    this._inputs = Array<Link>();
    this._outputs = Array<Link>();
    this._tasks = Array<Task>();
  }

  public getDescription() : string {
    return this._description;
  }

  public getId() : string {
    return this._id;
  }

  public getInputs() : Array<Link> {
    return this._inputs;
  }

  public getName() : string {
    return this._name;
  }

  public getOutputs() : Array<Link> {
    return this._outputs;
  }

  public getStatus() : number {
    return this._status;
  }

  public getTasks() : Array<Task> {
    return this._tasks;
  }

  public isFinal(): boolean {
    return this._final;
  }

  public isInitial(): boolean {
    return this._initial;
  }

  public isComplete(): boolean {
    return this._status === Status.Complete;
  }

  public isDone(): boolean {
    return this._status === Status.Done || this._status === Status.Complete;
  }

  public registerInput(link : Link) : void {
    this._inputs.push(link);
  }

  public registerOutput(link : Link) : void {
    this._outputs.push(link);
  }

  public registerTask(task : Task) {
    this._tasks.push(task);
    this.updateStatus();
  }

  public setDescription(description : string) : void {
    this._description = description;
  }

  public setFinal(final : boolean) {
    this._final = final;
  }

  public setInitial(initial : boolean) {
    this._initial = initial;
  }

  public setName(name : string) : void {
    this._name = name;
  }

  /**
   * This methods iterates the tasks in the state an set the global status of the state besed
   * on the status of its tasks.
   * @param status
   */
  public updateStatus() : void {
    let countTasks : number = this._tasks.length;
    let tasksStatuses : {[key : number] : Array<Task>} = {};
    if (countTasks) {
      for (let task of this._tasks) {
        tasksStatuses[task.getStatus()].push(task);
      }

      if (Object.keys(tasksStatuses).length === 1) {
        //all the tasks are in the same status so the state is in the same status of its tasks
        this._status = parseInt(Object.keys(tasksStatuses)[0]);
        return;
      }

      if (tasksStatuses[Status.New] && tasksStatuses[Status.New].length) {
        //if it has some tasks new...
        let tasks = tasksStatuses[Status.New]
          .filter((task : Task) => task.isRequired());
        if (tasks.length) {
          //if any of those new is required then set inProgress
          this._status = Status.InProgress;
          return;
        }

        //set as done but continue evaluating...
        this._status = Status.Done;
      }

      if (tasksStatuses[Status.InProgress] && tasksStatuses[Status.InProgress].length) {
        //if it has some tasks inProgress...
        let tasks = tasksStatuses[Status.InProgress]
            .filter((task : Task) => task.isRequired());
        if (tasks.length) {
          //if any of those inProgress is required then set inProgress
          this._status = Status.InProgress;
          return;
        }

        //if all the inProgress tasks are not required then set as done
        this._status = Status.Done
      }

      if (tasksStatuses[Status.Done] && tasksStatuses[Status.Done].length) {
        //there are tasks done but not all of them
        this._status = Status.Done;
        return;
      }

    } else {
      this._status = Status.Empty;
      return;
    }
  }

  public toString() : string {
    return `STATE ${this._id}: ${this._name} - Status: ${Status[this._status]}`
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

export default State;
