/**
 * Created by mpaoluc on 28/11/2016.
 */
import IState from "./IState";

interface ITask {

  getId() : string;
  isRequired() : boolean;
  getStatus() : number;

  setComplete() : void
  setRequired(required : boolean) : void;
  setStatus(status : number) : void;

  toString() : string;
}

export default ITask;