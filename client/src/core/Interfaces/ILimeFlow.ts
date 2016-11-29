import ILink from "./ILink";
import IState from "./IState";
/**
 * Created by Maxi Paolucci on 27/11/2016.
 */

interface ILimeFlow {

  getId() : string;
  getName() : string;
  getStatus() : number,

  addState(State : IState) : void;
  addLink(Link : ILink) : void;

  updateStatus() : void;

  toString() : string;
}

export default ILimeFlow;