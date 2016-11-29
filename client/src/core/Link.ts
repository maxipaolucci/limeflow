import ILink from "./Interfaces/ILink";
import State from "./State";

/**
 * Created by mpaoluc on 28/11/2016.
 */


class Link implements ILink {

  private _id : string;
  private _caption : string;
  private _origin : State;
  private _destiny : State;

  constructor(id : string, origin : State, destiny : State) {
    this._id = id;
    this._origin = origin;
    this._destiny = destiny;

    this._origin.registerOutput(this);
    this._destiny.registerInput(this);
    //TODO check no cycles
  }

  public setId(id : string): void {
    this._id = id;
  }

  public setCaption(caption : string): void {
    this._caption = caption;
  }

  public setOrigin(state: State): boolean {
    if (state) {
      this._origin = state;
      this._origin.registerOutput(this);
      //TODO check no cycles
      return true;
    }

    return false;
  }

  public setDestiny(state: State): boolean {
    if (state) {
      this._origin = state;
      this._destiny.registerInput(this);
      //TODO check no cycles
      return true;
    }

    return false;
  }

  public setStates(origin: State, destiny: State): boolean {
    if (origin && destiny) {
      this._origin = origin;
      this._destiny = destiny;
      this._origin.registerOutput(this);
      this._destiny.registerInput(this);
      //TODO check no cycles
      return true;
    }

    return false;
  }

  public getId(): string {
    return this._id;
  }

  public getCaption(): string {
    return this._caption;
  }

  public getOrigin(): State {
    return this._origin;
  }

  public getDestiny(): State {
    return this._destiny;
  }

  public toString() : string {
    return `LINK ${this._id}: ${this._caption} - Origin: ${this._origin.getId()}, Destiny: ${this._destiny.getId()}`
  }
}

export default Link;