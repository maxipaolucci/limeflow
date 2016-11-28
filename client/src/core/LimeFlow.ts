/**
 * Created by Maxi Paolucci on 27/11/2016.
 */
namespace Core {
  export class LimeFlow implements Core.Interfaces.ILimeFlow {

    private _id : string = null;
    private _name : string = null;
    private _description : string;
    private _states : Core.Interfaces.IState[];
    private _links : Core.Interfaces.ILink[];
    private _status : number;

    constructor(id : string, name : string, description? : string) {
      this._id = id;
      this._name = name;
      this._description = description || null;
      this._states = [];
      this._links = [];
      this._status = Core.Constants.Status.Empty;
    }

    public addLink(link : Core.Interfaces.ILink) {
      if (link) {
        this._links.push(link);
      } else {
        console.warn('LimeFlow: addLink() - link param is empty or null');
      }

    }

    public addState(state : Core.Interfaces.IState) {
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
      let limeFlowStr = `LIMEFLOW ${this._id}: ${this._name}`;
      for (let state in this._states) {
        limeFlowStr += state.toString();
      }
      for (let link in this._links) {
        limeFlowStr += link.toString();
      }

      return limeFlowStr;
    }

    public updateStatus() : void {
      //todo update status like in state class
    }
  }
}