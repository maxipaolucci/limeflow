/**
 * Created by Maxi Paolucci on 27/11/2016.
 */

import ITask from "./ITask";
import ILink from "./ILink";

interface IState {

  getId() : string;
  getInputs() : Array<ILink>;
  getOutputs() : Array<ILink>;
  getStatus() : number;
  getTasks() : Array<ITask>;
  getTaskById(id : string) : ITask;

  isFinal() : boolean;
  isInitial() : boolean;
  isComplete() : boolean;
  isDone() : boolean;

  registerInput(link : ILink) : void;
  registerOutput(link : ILink) : void;
  registerTask(task : ITask) : void;

  setInitial(initial : boolean) : void;
  setFinal(final : boolean) : void;
  updateStatus() : void;

  toString() : string;
  toJSON() : any;
}

export default IState;