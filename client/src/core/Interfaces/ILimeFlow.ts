/**
 * Created by Maxi Paolucci on 27/11/2016.
 */
namespace Core.Interfaces {
  export interface ILimeFlow {

    getId() : string;
    getName() : string;
    getStatus() : number,

    addState(State : Core.Interfaces.IState) : void;
    addLink(Link : Core.Interfaces.ILink) : void;

    updateStatus() : void;

    toString() : string;
  }
}