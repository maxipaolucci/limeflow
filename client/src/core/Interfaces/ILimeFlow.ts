/**
 * Created by Maxi Paolucci on 27/11/2016.
 */
namespace Core.Interfaces {
  export interface ILimeFlow {

    getId() : string;
    getName() : string;

    addState(State : Core.Interfaces.IState) : boolean;
    addLink(Link : Core.Interfaces.ILink) : boolean;

    toString() : string;
  }
}