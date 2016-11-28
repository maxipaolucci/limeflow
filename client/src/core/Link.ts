/**
 * Created by mpaoluc on 28/11/2016.
 */
namespace Core {

  export class Link implements Core.Interfaces.ILink {

    private _id : string;
    private _caption : string;
    private _origin : Core.Interfaces.IState;
    private _destiny : Core.Interfaces.IState;

    constructor(id : string, origin : Core.Interfaces.IState, destiny : Core.Interfaces.IState) {
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

    public setOrigin(state: Core.Interfaces.IState): boolean {
      if (state) {
        this._origin = state;
        this._origin.registerOutput(this);
        //TODO check no cycles
        return true;
      }

      return false;
    }

    public setDestiny(state: Core.Interfaces.IState): boolean {
      if (state) {
        this._origin = state;
        this._destiny.registerInput(this);
        //TODO check no cycles
        return true;
      }

      return false;
    }

    public setStates(origin: Core.Interfaces.IState, destiny: Core.Interfaces.IState): boolean {
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

    public getOrigin(): Core.Interfaces.IState {
      return this._origin;
    }

    public getDestiny(): Core.Interfaces.IState {
      return this._destiny;
    }

    public toString() : string {
      return `LINK ${this._id}: ${this._caption} - Origin: ${this._origin.getId()}, Destiny: ${this._destiny.getId()}`
    }
  }
}