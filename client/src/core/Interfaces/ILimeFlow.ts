import ILink from "./ILink";
import IState from "./IState";
/**
 * Created by Maxi Paolucci on 27/11/2016.
 */

interface ILimeFlow {

  addState(state : IState) : void;
  addLink(link : ILink) : void;
  getElementById(id : string, type? : string) : any;
  getId() : string;
  getLinkById(id : string) : ILink;
  getName() : string;
  getStateById(id : string) : IState;
  getStatus() : number,
  toString() : string;
  toJSON() : any;
  updateStatus() : void;
}

export default ILimeFlow;