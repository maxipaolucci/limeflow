/**
 * Created by Maxi Paolucci on 27/11/2016.
 */
namespace Core.Interfaces {

  export interface IState {

    getId() : string;
    getInputs() : Array<Core.Interfaces.ILink>;
    getOutputs() : Array<Core.Interfaces.ILink>;
    getStatus() : number;
    getTasks() : Array<Core.Interfaces.ITask>;

    isFinal() : boolean;
    isInitial() : boolean;
    isComplete() : boolean;
    isDone() : boolean;

    registerInput(link : Core.Interfaces.ILink) : void;
    registerOutput(link : Core.Interfaces.ILink) : void;
    registerTask(task : Core.Interfaces.ITask) : void;

    setInitial(initial : boolean) : void;
    setFinal(final : boolean) : void;
    updateStatus() : void;

    toString() : string;
  }
}