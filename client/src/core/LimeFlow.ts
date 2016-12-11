/**
 * Created by Maxi Paolucci on 27/11/2016.
 */

import ILimeFlow from './Interfaces/ILimeFlow';
import Status from "./Constants/Status";
import State from "./State";
import Link from "./Link";

abstract class LimeFlow implements ILimeFlow {

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
    this._status = Status.Empty;
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
    } else {
      console.warn('LimeFlow: addState() - state param is empty or null');
    }
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

  public abstract toJSON() : any;

  public updateStatus() : void {
    //todo update status like in state class
  }
}

export default LimeFlow;