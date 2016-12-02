import Status from "./Constants/Status";
import IState from "./Interfaces/IState";
import ITask from "./Interfaces/ITask";
/**
 * Created by mpaoluc on 28/11/2016.
 */

class Task implements ITask {

  private _id : string = null;
  private _name : string;
  private _description : string;
  private _status : Status;
  private _required : boolean;
  private _state : IState;

  constructor(id : string, required? : boolean, name? : string, description? : string) {
    this._id = id;
    this._required = required || false;
    this._name = name || null;
    this._description = description || null;
    this._status = Status.New;
    this._state = null;
  }

  public getDescription() : string {
    return this._description;
  }

  public getId() : string {
    return this._id;
  }

  public getName() : string {
    return this._name;
  }

  public getState() : IState {
    return this._state;
  }

  public getStatus() : number {
    return this._status;
  }

  public isRequired() : boolean {
    return this._required;
  }

  /**
   * Completition depends on the task to do, must be marked by an authorized person (we need to add users and permisions)
   */
  //public abstract setComplete();
  public setComplete() {
    //todo remove this implementation, this method must be abstract
    this._status = Status.Complete;
    this._state.updateStatus();
  }

  public setRequired(required : boolean) {
    this._required = required;
  }

  public setState(state : IState) {
    if (state) {
      this._state = state;
      this._state.updateStatus();
    } else {
      console.warn('Task: setState() > state is null');
    }
  }

  public setStatus(status : number) {
    if (this._status !== Status.Complete) {
      this._status = status;
      if (this._state) {
        this._state.updateStatus();
      }
    }
  }

  public toString() {
    return `TASK ${this._id}: ${this._name} - Status: ${Status[this._status]}`;
  }

}

export default Task;