import ILink from "./ILink";
import IState from "./IState";
import ITask from "./ITask";
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
  getDescription() : string;
  getStateById(id : string) : IState;
  getStatus() : number,
  getTaskById(id : string) : ITask;
  setDescription(description : string) : void;
  setName(name : string) : void;
  setStatus(status : number) : void;
  toString() : string;
  toJSON() : any;
  render() : void;
  fromJSON(jsonDefinition : any) : ILimeFlow;
  updateStatus() : void;
}

export default ILimeFlow;