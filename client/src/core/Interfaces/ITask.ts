/**
 * Created by mpaoluc on 28/11/2016.
 */

interface ITask {

  getId() : string;
  isRequired() : boolean;
  getStatus() : number;

  setComplete() : void
  setRequired(required : boolean) : void;
  setStatus(status : number) : void;

  toString() : string;
  toJSON() : any;
}

export default ITask;