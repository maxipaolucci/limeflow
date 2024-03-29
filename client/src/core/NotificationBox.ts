/**
 * Created by mpaoluc on 22/12/2016.
 */
import INotificationBox from "./Interfaces/INotificationBox";
import NotificationCode from "./Constants/NotificationCode";
/**
 * This is the structure use by the Observer-Observable pattenr to share information in Limeflow
 */
class NotificationBox<T> implements INotificationBox<T> {

  private _id : string;
  private _object : T;
  private _message : string;
  private _code : NotificationCode;

  constructor(object : T, message : string, code : NotificationCode) {
    this._id = '1';
    this._object = object;
    this._message = message;
    this._code = code;
  }

  setId(id : string): void {
    this._id = id;
  }

  getId(): string {
    return this._id;
  }

  getObject(): T {
    return this._object;
  }

  setObject(value: T) {
    this._object = value;
  }

  getMessage(): string {
    return this._message;
  }

  setMessage(value: string) {
    this._message = value;
  }

  getCode(): NotificationCode {
    return this._code;
  }

  setCode(value: NotificationCode) {
    this._code = value;
  }
}

export default NotificationBox;