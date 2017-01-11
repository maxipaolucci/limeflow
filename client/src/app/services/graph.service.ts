/**
 * Created by Maxi Paolucci on 12/12/2016.
 */
import { Injectable }	from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {CssStatusColors} from "../css-colors";
import Status from "../../core/Constants/ElementStatus";

@Injectable()
export class GraphService {
  private mockDataUrl = 'src/data';  // URL to web API

  constructor (private http: Http) {}

  public importGraphJSON(filename : string) : Observable<any> {
    return this.http.get(this.mockDataUrl + `/${filename}.json`)
    .map(this.extractData)
    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
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
  public getCssStatusColor(status : number) : string {
    return CssStatusColors[Status[status]];
  }
}