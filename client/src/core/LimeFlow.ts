/**
 * Created by Maxi Paolucci on 27/11/2016.
 */
import ILimeFlow from './Interfaces/ILimeFlow';
import Status from "./Constants/Status";
import State from "./State";
import Link from "./Link";

class LimeFlow implements ILimeFlow {

  private _id : string = null;
  private _name : string = null;
  private _description : string;
  private _states : Array<State>;
  private _links : Array<Link>;
  private _status : number;

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

  public toJSON() : any {
    let elementsArr : Array<any> = Array<any>();

    for (let state of this._states) {
      elementsArr.push(state.toJSON());
    }

    for (let link of this._links) {
      elementsArr.push(link.toJSON());
    }

    return {
      container: document.getElementById('cy'),
      elements : elementsArr
    };
  }

  public render() {
    let config = this.toJSON();
    let cy = cytoscape(config);
  }

  public updateStatus() : void {
    //todo update status like in state class
  }
}

export default LimeFlow;