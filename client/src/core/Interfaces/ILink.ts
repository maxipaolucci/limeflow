/**
 * Created by Maxi Paolucci on 27/11/2016.
 */
namespace Core.Interfaces {
  export interface ILink {

    setId(string) : void;
    setCaption(string) : void;
    setOrigin(State : Core.Interfaces.IState) : boolean;
    setDestiny(State : Core.Interfaces.IState) : boolean;
    setStates(State : Core.Interfaces.IState, State : Core.Interfaces.IState) : boolean;

    getId() : string;
    getCaption() : string;
    getOrigin() : Core.Interfaces.IState;
    getDestiny() : Core.Interfaces.IState;

    toString() : string;
  }
}