/**
 * Created by Maxi Paolucci on 12/12/2016.
 */
import { Injectable }	from '@angular/core';
import Status from "../../core/Constants/ElementStatus";


@Injectable()
export class AppCommonService {

  /**
   * Returns the numeric value of the Status given the key as a string "New", "Complete", ...
   * @param statusKey {string} . The key in the Status object
   * @returns {number} : The value of the key or -1 if not valid
   */
  getStatusValue(statusKey : string) : number {
    return Status[statusKey] || -1;
  }
}