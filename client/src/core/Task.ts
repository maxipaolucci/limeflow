import Status from "./Constants/ElementStatus";
import State from "./State";
import ITask from "./Interfaces/ITask";
import {IObservable, IObserver} from "./Interfaces/IObserver";
import NotificationBox from "./NotificationBox";
import NotificationCode from "./Constants/NotificationCode";
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

  getDescription() : string {
    return this._description;
  }

  getId() : string {
    return this._id;
  }

  getName() : string {
    return this._name;
  }

  getStatus() : number {
    return this._status;
  }

  isRequired() : boolean {
    return this._required;
  }

  /**
   * Completition depends on the task to do, must be marked by an authorized person (we need to add users and permisions)
   */
  //public abstract setComplete();
  setComplete() {
    //todo remove this implementation, this method must be abstract
    this._status = Status.Complete;
    let message = new NotificationBox<Task>(this, 'Status changed', NotificationCode.StatusChanged);
    this.notifyObservers(message);
  }

  setRequired(required : boolean) {
    this._required = required;
  }

  setStatus(status : number) {
    if (status !== Status.Complete) {
      this._status = status;
      let message = new NotificationBox<Task>(this, 'Status changed', NotificationCode.StatusChanged);
      this.notifyObservers(message);
    }
  }

  toString() {
    return `TASK ${this._id}: ${this._name} - Status: ${Status[this._status]}`;
  }

  toJSON() : any {
    return {
      id : this._id,
      description : this._description,
      name : this._name,
      required : this._required,
      status : this._status
    };
  }

  registerObserver(observer: IObserver): void {
    this._observers.push(observer);
  }

  removeObserver(observer: IObserver): void {
    let i = this._observers.length;

    while (i--) {
      if (this._observers[i] === observer) {
        this._observers.splice(i, 1);
      } // if we found it.
    }
  }

  notifyObservers(message : NotificationBox<Task>): void {
    for (let observer of this._observers) {
      observer.receiveNotification(message);
    }
  }

}

export default Task;