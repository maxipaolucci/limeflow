/**
 * Created by Maxi Paolucci on 27/11/2016.
 */
module Core {
  export class State {

    private _name : string;
    private _description : string;

    constructor(name : string, description : string) {
      this._name = name;
      this._description = description;
    }
  }
}