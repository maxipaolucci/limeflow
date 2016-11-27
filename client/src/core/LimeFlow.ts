/**
 * Created by Maxi Paolucci on 27/11/2016.
 */
module Core {
  export abstract class LimeFlow implements ILimeFlow {

    private _name : string;
    private _description : string;
    private _states : Core.State[];
    private _links : Core.Link[];

    constructor(name : string, description : string) {
      this._name = name;
      this._description = description;
      this._states = [];
      this._links = [];
    }

    addLink(link : Core.Link) {
      this._links.push(link);
    }

    addState(state : Core.State) {
      this._states.push(state);
    }
  }
}