import Task from "../../../core/Task";
/**
 * Created by Maxi Paolucci on 18/01/2017.
 */

class NgLimeTask extends Task {

  private urlToComponent : string;

  constructor(id : string, required? : boolean, name? : string, description? : string) {
    super(id, required, name, description);

    this.urlToComponent = null;
  }

  getUrlToComponent() : string {
    return this.urlToComponent;
  }

  setUrlToComponent(url : string) : void {
    this.urlToComponent = url;
  }

  toJSON() : any {
    let toJSON = super.toJSON();
    toJSON.urlToComponent = this.urlToComponent;

    return toJSON;
  }
}

export default NgLimeTask;