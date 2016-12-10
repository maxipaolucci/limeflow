import ILink from "./ILink";
import IState from "./IState";
/**
 * Created by Maxi Paolucci on 27/11/2016.
 */

interface ILimeFlow {

  addState(State : IState) : void;
  addLink(Link : ILink) : void;
  getId() : string;
  getName() : string;
  getStatus() : number,
  toString() : string;
  toJSON() : any;
  updateStatus() : void;
}

export default ILimeFlow;