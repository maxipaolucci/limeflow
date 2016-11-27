/**
 * Created by Maxi Paolucci on 27/11/2016.
 */
module Core.Interfaces {
  export interface ILimeFlow {

    addState(State : Core.IState);
    addLink(Link : Core.Link);

  }
}