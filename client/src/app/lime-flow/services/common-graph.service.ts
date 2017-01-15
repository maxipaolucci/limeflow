/**
 * Created by Maxi Paolucci on 12/12/2016.
 */
import { Injectable }	from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {CssStatusColors} from "../../css-colors";
import Status from "../../../core/Constants/ElementStatus";


/**
 * Use is as a shared service accross all the components in the app.
 */
@Injectable()
export class CommonGraphService {
  private mockDataUrl = 'src/data';  // URL to web API
  private nextGraphId = 1000; //the last graph id created

  constructor (private http: Http) {}

  /**
   * Get a json graph definition stored in the server under the filename provided.
   * @param filename . The filename looked for
   * @returns {Observable<R>}
   */
  importGraphJSON(filename : string) : Observable<any> {
    return this.http.get(this.mockDataUrl + `/${filename}.json`)
    .map(this.extractData)
    .catch(this.handleError);
  }

  private extractData(res: Response) : any {
    let body = res.json();
    return body.data || {};
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  /**
   * Get the css status color from a Status value
   * @param (Enum<Status>) status . The status of the node
   *
   * @returns {string} . The hexa value of the color
   */
  getCssStatusColor(status : number) : string {
    return CssStatusColors[Status[status]];
  }

  /**
   * Returns the nextGraphId value and incrementes the value in 1 unit.
   * @returns nextId : string . The next id to use in a cytoscape component container
   */
  getNextGraphId() : string {
    let nextId : string = this.nextGraphId.toString();
    this.nextGraphId += 1;
    return nextId;
  }
}