import NotificationCode from "../Constants/NotificationCode";
/**
 * Created by Maxi Paolucci on 27/11/2016.
 */

interface INotificationBox<T> {

  setId(id : string) : void;
  getId() : string;

  getObject() : T;
  setObject(object : T) : void;

  getMessage() : string;
  setMessage(value : string) : void;

  getCode() : NotificationCode;
  setCode(code : NotificationCode) : void;
}

export default INotificationBox;
