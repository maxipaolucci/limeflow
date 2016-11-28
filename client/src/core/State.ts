/**
 * Created by Maxi Paolucci on 27/11/2016.
 */
namespace Core {

  export abstract class State implements Core.Interfaces.IState {

    private _id : string = null;
    private _name : string;
    private _description : string;
    private _initial : boolean;
    private _final : boolean;
    private _status : Core.Constants.Status;
    private _inputs : Array<Core.Interfaces.ILink>;
    private _outputs : Array<Core.Interfaces.ILink>;
    private _tasks : Array<Core.Interfaces.ITask>;

    constructor(id : string, name? : string, description? : string) {
      this._id = id;
      this._name = name || null;
      this._description = description || null;
      this._initial = false;
      this._final = false;
      this._status = Core.Constants.Status.New;
      this._inputs = Array<Core.Interfaces.ILink>();
      this._outputs = Array<Core.Interfaces.ILink>();
      this._tasks = Array<Core.Interfaces.ITask>();
    }

    public getDescription() : string {
      return this._description;
    }

    public getId() : string {
      return this._id;
    }

    public getInputs() : Array<Core.Interfaces.ILink> {
      return this._inputs;
    }

    public getName() : string {
      return this._name;
    }

    public getOutputs() : Array<Core.Interfaces.ILink> {
      return this._outputs;
    }

    public getStatus() : Core.Constants.Status {
      return this._status;
    }

    public getTasks() : Array<Core.Interfaces.ITask> {
      return this._tasks;
    }

    public isFinal(): boolean {
      return this._final;
    }

    public isInitial(): boolean {
      return this._initial;
    }

    public isComplete(): boolean {
      return this._status === Core.Constants.Status.Complete;
    }

    public isDone(): boolean {
      return this._status === Core.Constants.Status.Done || this._status === Core.Constants.Status.Complete;
    }

    public registerInput(link : Core.Interfaces.ILink) : void {
      this._inputs.push(link);
    }

    public registerOutput(link : Core.Interfaces.ILink) : void {
      this._outputs.push(link);
    }

    public registerTask(task : Core.Interfaces.ITask) {
      this._tasks.push(task);
    }

    public setDescription(description : string) : void {
      this._description = description;
    }

    public setFinal(final : boolean) {
      this._final = final;
    }

    public setInitial(initial : boolean) {
      this._initial = initial;
    }

    public setName(name : string) : void {
      this._name = name;
    }

    public setStatus(status : Core.Constants.Status) : void {
      //todo this depends on the state of its tasks
    }

    public toString() : string {
      return `STATE ${this._id}: ${this._name} - Status: ${this._status}`
    }
  }
}