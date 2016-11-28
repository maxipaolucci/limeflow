/**
 * Created by Maxi Paolucci on 27/11/2016.
 */
namespace Core {
  export abstract class LimeFlow implements Core.Interfaces.ILimeFlow {

    private _id : string = null;
    private _name : string = null;
    private _description : string;
    private _states : Core.State[];
    private _links : Core.Link[];

    constructor(id : string, name : string, description? : string) {
      this._id = id;
      this._name = name;
      this._description = description || null;
      this._states = [];
      this._links = [];
    }

    public addLink(link : Core.Link) {
      this._links.push(link);
    }

    public addState(state : Core.State) {
      this._states.push(state);
    }

    public getId() {
      return this._id;
    }

    public getName() {
      return this._name;
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
  }
}