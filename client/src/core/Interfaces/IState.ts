/**
 * Created by Maxi Paolucci on 27/11/2016.
 */
module Core.Interfaces {
  export interface IState {

    setId(string) : void;
    setName(name : String) : void;

    getId() : string;
    getName() : string;
    getInputs() : Core.Interfaces.ILink[];
    getOutputs() : Core.Interfaces.ILink[];
    isFinal() : boolean;
    isInitial() : boolean;
    getStatus() : Core.Constants.Status;
  }
}