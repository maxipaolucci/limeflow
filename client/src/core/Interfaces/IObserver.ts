/**
 * Created by mpaoluc on 20/12/2016.
 */

export interface IObservable {
  registerObserver(Observer: IObserver) : void;
  removeObserver(Observer: IObserver) : void;
  notifyObservers() : void;
}

export interface IObserver {
  receiveNotification<T>(Message: T): void;
}