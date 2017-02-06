/**
 * Created by Maxi Paolucci on 27/11/2016.
 */
import ILimeFlow from './Interfaces/ILimeFlow';
import Status from "./Constants/ElementStatus";
import State from "./State";
import Task from "./Task";
import Link from "./Link";
import {ElementType} from "./Constants/ElementType";
import {IObserver} from "./Interfaces/IObserver";
import NotificationBox from "./NotificationBox";

abstract class LimeFlow implements ILimeFlow, IObserver {

  protected _id : string;
  protected _name : string;
  protected _description : string;
  protected _states : Array<State>;
  protected _links : Array<Link>;
  protected _status : number;

  constructor(id : string, name : string, description? : string) {
    this._id = id;
    this._name = name;
    this._description = description || null;
    this._states = Array<State>();
    this._links = Array<Link>();
    this._status = Status.New;
  }

  addLink(link : Link) : void {
    if (link) {
      this._links.push(link);
    } else {
      console.warn('LimeFlow: addLink() - link param is empty or null');
    }

  }

  addState(state : State) : void {
    if (state) {
      this._states.push(state);
      state.registerObserver(this);
    } else {
      console.warn('LimeFlow: addState() - state param is empty or null');
    }
  }

  /**
   * Retrieves a Link using the id
   * @param id . The id looked for
   * @returns Link . The Link found or null if not exists.
   */
  getLinkById(id : string) : Link {
    let elements : Link[] = this._links.filter( link => link.getId() === id );

    return elements.length > 0 ? elements[0] : null; //the link that matches that id must be unique
  }

  /**
   * Retrieves a State using the id
   * @param id . The id looked for
   * @returns State . The State found or null if not exists.
   */
  getStateById(id : string) : State {
    let elements : State[] = this._states.filter( state => state.getId() === id );

    return elements.length > 0 ? elements[0] : null; //the state that matches that id must be unique
  }

  /**
   * Retrieves a Task using the id
   * @param id . The id looked for
   * @returns Task . The Task found or null if not exists.
   */
  getTaskById(id : string) : Task {
    let element : Task = null;
    for (let state of this._states) {
      element = state.getTaskById(id);
      if (element) {
        break;
      }
    }

    return element; //the state that matches that id must be unique
  }

  /**
   * Returns an element by ID
   * @param id . The id looked for
   * @param type . Optional, one of ElementType constant.
   * @returns State or Link . The element found for that id or null
   */
  getElementById(id : string, type? : string) : any {
    let element : any = null;

    if (type === ElementType.State) {
      element = <State>this.getStateById(id);
    } else if (type === ElementType.Link) {
      element = <Link>this.getLinkById(id);
    } else if (type === ElementType.Task) {
      element = <Task>this.getTaskById(id);
    } else if (!type) {
      element = <State>this.getStateById(id);
      if (!element) {
        element = <Link>this.getLinkById(id);
      }
    }

    return element;
  }

  getId() : string {
    return this._id;
  }

  getName() : string {
    return this._name;
  }

  getDescription() : string {
    return this._description;
  }

  getStatus() : number {
    return this._status;
  }

  toString() : string {
    let limeFlowStr = `LIMEFLOW ${this._id}: ${this._name} \n`;
    for (let state of this._states) {
      limeFlowStr += `${state.toString()} \n`;
    }
    for (let link of this._links) {
      limeFlowStr += `${link.toString()} \n`;
    }

    return limeFlowStr;
  }

  /**
   * This is the implementation of the Observer interface method receiveNotification.
   * @param message : NotificationBox<State>. The message expected generated by the observable
   *  class this one is observing.
   */
  receiveNotification(message: NotificationBox<State>) : void {
    this.updateStatus();
  }

  setDescription(description : string) : void {
    this._description = description;
  }

  setName(name : string) : void {
    this._name = name;
  }

  setStatus(status : number) : void {
    this._status = status;
  }

  /**
   * Generates a json definition of the flow rendered. The json format is the provided by the visual library that renders the
   * graph. So we left this one abstract to be implemented by the concrete one.
   */
  abstract toJSON() : any;

  /**
   * Render the flow in the screen. To be implemented by the specific visual library that renders
   * the graph.
   */
  abstract render() : void;

  /**
   * Creates a flow from a json definition. The json format is the provided by the visual library that renders the
   * graph. So we left this one abstract to be implemented by the concrete one.
   *
   * @param jsonDefinition . The json definition of the graph.
   * @return LimeFlow. The instance created.
   */
  abstract fromJSON(jsonDefinition : any) : LimeFlow;

  updateStatus() : void {
    let countStates : number = this._states.length;
    let statesStatuses : {[key : number] : Array<State>} = {};
    //let notificationBox = new NotificationBox<State>(this, 'Status changed', NotificationCode.StatusChanged);

    if (countStates) {
      for (let state of this._states) {
        if (statesStatuses[state.getStatus()]) {
          statesStatuses[state.getStatus()].push(state);
        } else {
          statesStatuses[state.getStatus()] = [state];
        }
      }

      if (Object.keys(statesStatuses).length === 1) {
        //all the states are in the same status so the limeflow is in the same status of its states
        this._status = parseInt(Object.keys(statesStatuses)[0]);
        return;// this.notifyObservers(notificationBox);
      }

      //if not all are in the same status then it is in progress
      this._status = Status.InProgress;
      return;
    }

    //if nothing happend before then set as New
    this._status = Status.New;
    return;// this.notifyObservers(notificationBox);
  }
}

export default LimeFlow;