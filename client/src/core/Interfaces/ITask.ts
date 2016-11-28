/**
 * Created by mpaoluc on 28/11/2016.
 */
namespace Core.Interfaces {
  export interface ITask {

    getId() : string;
    isRequired() : boolean;
    getState() : Core.Interfaces.IState;
    getStatus() : number;

    setComplete() : void
    setRequired(required : boolean) : void;
    setState(state : Core.Interfaces.IState) : void;
    setStatus(status : number) : void;

    toString() : string;
  }
}