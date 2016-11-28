/**
 * Created by Maxi Paolucci on 27/11/2016.
 */
namespace Core.Interfaces {
  export interface ILink {

    setId(id : string) : void;
    setCaption(caption : string) : void;
    setOrigin(state : Core.Interfaces.IState) : boolean;
    setDestiny(state : Core.Interfaces.IState) : boolean;
    setStates(origin : Core.Interfaces.IState, destiny : Core.Interfaces.IState) : boolean;

    getId() : string;
    getCaption() : string;
    getOrigin() : Core.Interfaces.IState;
    getDestiny() : Core.Interfaces.IState;

    toString() : string;
  }
}