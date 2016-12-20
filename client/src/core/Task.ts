import Status from "./Constants/Status";
import State from "./State";
import ITask from "./Interfaces/ITask";
import {IObservable, IObserver} from "./Interfaces/IObserver";
/**
 * Created by mpaoluc on 28/11/2016.
 */

class Task implements ITask, IObservable {

  private _id : string = null;
  private _name : string;
  private _description : string;
  private _status : Status;
  private _required : boolean;
  protected _observers : Array<IObserver>;

  constructor(id : string, required? : boolean, name? : string, description? : string) {
    this._id = id;
    this._required = required || false;
    this._name = name || null;
    this._description = description || null;
    this._status = Status.New;
    this._observers = Array<IObserver>();
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
    this.notifyObservers();
  }

  public setRequired(required : boolean) {
    this._required = required;
  }

  public setStatus(status : number) {
    if (status !== Status.Complete) {
      this._status = status;
      this.notifyObservers();
    }
  }

  public toString() {
    return `TASK ${this._id}: ${this._name} - Status: ${Status[this._status]}`;
  }

  public registerObserver(observer: IObserver): void {
    this._observers.push(observer);
    observer.receiveNotification(`${this._id} task was registeres`)
  }

  public removeObserver(observer: IObserver): void {
    let i = this._observers.length;

    while (i--) {
      if (this._observers[i] === observer) {
        this._observers.splice(i, 1);
      } // if we found it.
    }
  }

  public notifyObservers(): void {
    for (let observer of this._observers) {
      observer.receiveNotification(`${this._id} updated status`);
    }
  }

}

export default Task;