/**
 * Created by mpaoluc on 28/11/2016.
 */
namespace Core.Interfaces {
  export interface ITask {

    getId() : string;
    isRequired() : boolean;
    getStatus() : Core.Constants.Status;

    setRequired(required : boolean) : void;
    setStatus(status : Core.Constants.Status) : void;
    setComplete() : void

    toString() : string;
  }
}