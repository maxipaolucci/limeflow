import IState from "./Interfaces/IState";
import Status from "./Constants/Status";
import Link from "./Link";
import Task from "./Task";
import {IObservable, IObserver} from "./Interfaces/IObserver";
/**
 * Created by Maxi Paolucci on 27/11/2016.
 */


abstract class State implements IState, IObservable, IObserver {
  protected _id : string = null;
  protected _name : string;
  protected _description : string;
  protected _initial : boolean;
  protected _final : boolean;
  protected _status : number;
  protected _inputs : Array<Link>;
  protected _outputs : Array<Link>;
  protected _tasks : Array<Task>;
  protected _observers : Array<IObserver>;

  constructor(id : string, name? : string, description? : string) {
    this._id = id;
    this._name = name || null;
    this._description = description || null;
    this._initial = false;
    this._final = false;
    this._status = Status.New;
    this._inputs = Array<Link>();
    this._outputs = Array<Link>();
    this._tasks = Array<Task>();
    this._observers = Array<IObserver>();
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
    task.registerObserver(this);
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
        if (tasksStatuses[task.getStatus()]) {
          tasksStatuses[task.getStatus()].push(task);
        } else {
          tasksStatuses[task.getStatus()] = [task];
        }
      }

      if (Object.keys(tasksStatuses).length === 1) {
        //all the tasks are in the same status so the state is in the same status of its tasks
        this._status = parseInt(Object.keys(tasksStatuses)[0]);
        return this.notifyObservers();
      }

      if (tasksStatuses[Status.New] && tasksStatuses[Status.New].length) {
        //if it has some tasks new...
        let tasks = tasksStatuses[Status.New]
          .filter((task : Task) => task.isRequired());
        if (tasks.length) {
          //if any of those new is required then set inProgress
          this._status = Status.InProgress;
          return this.notifyObservers();
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
          return this.notifyObservers();
        }

        //if all the inProgress tasks are not required then set as done
        this._status = Status.Done
      }

      if (tasksStatuses[Status.Done] && tasksStatuses[Status.Done].length) {
        //there are tasks done but not all of them
        this._status = Status.Done;
        return this.notifyObservers();
      }

    } else {
      this._status = Status.New;
      return this.notifyObservers();
    }

    return this.notifyObservers();
  }

  public toString() : string {
    return `STATE ${this._id}: ${this._name} - Status: ${Status[this._status]}`
  }

  public abstract toJSON() : any;

  public registerObserver(observer: IObserver): void {
    this._observers.push(observer);
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

  /**
   * This class is an Observer too so this is the implementation of receive notification
   * @param message
   */
  public receiveNotification<T>(message: string): void {
    console.log(message);
    this.updateStatus();
  }
}

export default State;
