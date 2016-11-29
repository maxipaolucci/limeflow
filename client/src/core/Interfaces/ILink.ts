/**
 * Created by Maxi Paolucci on 27/11/2016.
 */
import IState from "./IState";

interface ILink {

  setId(id : string) : void;
  setCaption(caption : string) : void;
  setOrigin(state : IState) : boolean;
  setDestiny(state : IState) : boolean;
  setStates(origin : IState, destiny : IState) : boolean;

  getId() : string;
  getCaption() : string;
  getOrigin() : IState;
  getDestiny() : IState;

  toString() : string;
}

export default ILink;
