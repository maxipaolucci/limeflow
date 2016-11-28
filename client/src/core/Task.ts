/**
 * Created by mpaoluc on 28/11/2016.
 */
namespace Core {
  export abstract class Task implements Core.Interfaces.ITask {

    private _id : string = null;
    private _name : string;
    private _description : string;
    private _status : Core.Constants.Status;
    private _required : boolean;

    constructor(id : string, required? : boolean, name? : string, description? : string) {
      this._id = id;
      this._required = required || false;
      this._name = name || null;
      this._description = description || null;
      this._status = Core.Constants.Status.New;
    }

    public getDescription() : string {
      return this._description;
    }

    public getId() : string {
      return this._id;
    }

    public getName() : string {
      return this._name;
    }

    public getStatus(): Core.Constants.Status {
      return this._status;
    }

    public isRequired() : boolean {
      return this._required;
    }

    public setRequired(required : boolean) {
      this._required = required;
    }

    public setStatus(status : Core.Constants.Status) {
      if (this._status !== Core.Constants.Status.Complete) {
        this._status = status;
      }
    }

    /**
     * Completition depends on the task to do, must be marked by an authorized person (we need to add users and permisions)
     */
    public abstract setComplete();

    public toString() {
      return `TASK ${this._id}: ${this._name} - Status: ${this._status}`;
    }

  }
}