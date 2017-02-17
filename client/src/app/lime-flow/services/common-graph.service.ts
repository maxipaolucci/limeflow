/**
 * Created by Maxi Paolucci on 12/12/2016.
 */
import { Injectable }	from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {UIStatusInfo} from "../../css-colors";
import Status from "../../../core/Constants/ElementStatus";


/**
 * Use is as a shared service accross all the components in the app.
 */
@Injectable()
export class CommonGraphService {
  private mockDataUrl = 'src/data';  // URL to web API

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
   * Get the UI status info from a Status value. The info retrieved could be filtered by key if provided
   * @param (Enum<Status>) status . The status of the node
   * @param {string} . Optional, a key to filter the result by that field
   *
   * @returns {Object | string} . An object with UI status info if no key provided,
   *    otherwise returns the property matching the key
   */
  static getUIStatusInfo(status : number, key? : string) : string {
    return key ? UIStatusInfo[Status[status]][key] : UIStatusInfo[Status[status]];
  }
}