/**
 * Created by Maxi Paolucci on 27/11/2016.
 */
namespace Core {

  export class State implements Core.Interfaces.IState {

    private _id : string = null;
    private _name : string;
    private _description : string;
    private _initial : boolean;
    private _final : boolean;
    private _status : number;
    private _inputs : Array<Core.Link>;
    private _outputs : Array<Core.Link>;
    private _tasks : Array<Core.Task>;

    constructor(id : string, name? : string, description? : string) {
      this._id = id;
      this._name = name || null;
      this._description = description || null;
      this._initial = false;
      this._final = false;
      this._status = Core.Constants.Status.Empty;
      this._inputs = Array<Core.Link>();
      this._outputs = Array<Core.Link>();
      this._tasks = Array<Core.Task>();
    }

    public getDescription() : string {
      return this._description;
    }

    public getId() : string {
      return this._id;
    }

    public getInputs() : Array<Core.Link> {
      return this._inputs;
    }

    public getName() : string {
      return this._name;
    }

    public getOutputs() : Array<Core.Link> {
      return this._outputs;
    }

    public getStatus() : number {
      return this._status;
    }

    public getTasks() : Array<Core.Task> {
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

    public registerInput(link : Core.Link) : void {
      this._inputs.push(link);
    }

    public registerOutput(link : Core.Link) : void {
      this._outputs.push(link);
    }

    public registerTask(task : Core.Task) {
      this._tasks.push(task);
      this.updateStatus();
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

    /**
     * This methods iterates the tasks in the state an set the global status of the state besed
     * on the status of its tasks.
     * @param status
     */
    public updateStatus() : void {
      let countTasks : number = this._tasks.length;
      let tasksStatuses : {[key : number] : Array<Core.Task>} = {};
      if (countTasks) {
        for (let task of this._tasks) {
          let _task : Core.Task = <Core.Task>task;
          tasksStatuses[_task.getStatus()].push(_task);
        }

        if (Object.keys(tasksStatuses).length === 1) {
          //all the tasks are in the same status so the state is in the same status of its tasks
          this._status = parseInt(Object.keys(tasksStatuses)[0]);
          return;
        }

        if (tasksStatuses[Core.Constants.Status.New] && tasksStatuses[Core.Constants.Status.New].length) {
          //if it has some tasks new...
          let tasks = tasksStatuses[Core.Constants.Status.New]
            .filter((task : Core.Task) => task.isRequired());
          if (tasks.length) {
            //if any of those new is required then set inProgress
            this._status = Core.Constants.Status.InProgress;
            return;
          }

          //set as done but continue evaluating...
          this._status = Core.Constants.Status.Done;
        }

        if (tasksStatuses[Core.Constants.Status.InProgress] && tasksStatuses[Core.Constants.Status.InProgress].length) {
          //if it has some tasks inProgress...
          let tasks = tasksStatuses[Core.Constants.Status.InProgress]
              .filter((task : Core.Task) => task.isRequired());
          if (tasks.length) {
            //if any of those inProgress is required then set inProgress
            this._status = Core.Constants.Status.InProgress;
            return;
          }

          //if all the inProgress tasks are not required then set as done
          this._status = Core.Constants.Status.Done
        }

        if (tasksStatuses[Core.Constants.Status.Done] && tasksStatuses[Core.Constants.Status.Done].length) {
          //there are tasks done but not all of them
          this._status = Core.Constants.Status.Done;
          return;
        }

      } else {
        this._status = Core.Constants.Status.Empty;
        return;
      }
    }

    public toString() : string {
      return `STATE ${this._id}: ${this._name} - Status: ${this._status}`
    }
  }
}