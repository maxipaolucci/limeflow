/**
 * Created by mpaoluc on 28/11/2016.
 */
import IState from "./IState";

interface ITask {

  getId() : string;
  isRequired() : boolean;
  getState() : IState;
  getStatus() : number;

  setComplete() : void
  setRequired(required : boolean) : void;
  setState(state : IState) : void;
  setStatus(status : number) : void;

  toString() : string;
}

export default ITask;