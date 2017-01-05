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
  protected _id : string = null;
  protected _name : string = null;
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

  public addLink(link : Link) {
    if (link) {
      this._links.push(link);
    } else {
      console.warn('LimeFlow: addLink() - link param is empty or null');
    }

  }

  public addState(state : State) {
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
  public getLinkById(id : string) : Link {
    let elements : Link[] = this._links.filter( link => link.getId() === id );

    return elements.length > 0 ? elements[0] : null; //the link that matches that id must be unique
  }

  /**
   * Retrieves a State using the id
   * @param id . The id looked for
   * @returns State . The State found or null if not exists.
   */
  public getStateById(id : string) : State {
    let elements : State[] = this._states.filter( state => state.getId() === id );

    return elements.length > 0 ? elements[0] : null; //the state that matches that id must be unique
  }

  /**
   * Retrieves a Task using the id
   * @param id . The id looked for
   * @returns Task . The Task found or null if not exists.
   */
  public getTaskById(id : string) : Task {
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
  public getElementById(id : string, type? : string) {
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

  public getId() {
    return this._id;
  }

  public getName() {
    return this._name;
  }

  public getStatus() {
    return this._status;
  }

  public toString() {
    let limeFlowStr = `LIMEFLOW ${this._id}: ${this._name} \n`;
    for (let state of this._states) {
      limeFlowStr += `${state.toString()} \n`;
    }
    for (let link of this._links) {
      limeFlowStr += `${link.toString()} \n`;
    }

    return limeFlowStr;
  }

  public receiveNotification(message: NotificationBox<State>): void {
    this.updateStatus();
  }

  /**
   * Generates a json definition of the flow rendered. Abstract because depends on the json format
   * of the concrete class who is responsible to render the graph
   */
  public abstract toJSON() : any;

  /**
   * Creates a flow from a json definition. Abstract method implemented from concrete class
   * who knows the json format required to render the flow
   *
   * @param jsonDefinition
   * @return LimeFlow. The instance created.
   */
  public abstract fromJSON(jsonDefinition : any) : LimeFlow;

  public updateStatus() : void {
    //todo update status like in state class
    this._status = Status.InProgress;
  }
}

export default LimeFlow;