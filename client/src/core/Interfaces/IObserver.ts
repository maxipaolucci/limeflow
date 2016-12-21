import INotificationBox from "./INotificationBox";
/**
 * Created by mpaoluc on 20/12/2016.
 */

export interface IObservable {
  registerObserver(observer: IObserver) : void;
  removeObserver(observer: IObserver) : void;
  notifyObservers(message : INotificationBox<any>) : void;
}

export interface IObserver {
  receiveNotification(message : INotificationBox<any>): void;
}