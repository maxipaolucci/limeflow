import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output, OnInit } from '@angular/core';
import { List, Map } from  'immutable';
import {select} from "ng2-redux/lib/index";
import {VottingActions} from "../../vottingActions.service";
import {Observable} from "rxjs/Rx";


@Component({
  selector: 'results-component',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  private votePair : List<string> = List<string>();
  private voteTally : any = {};
  @select(['vottingModel', 'vote']) vote : Observable<Map<string, any>>;

  constructor(private vottingActions: VottingActions) {}

  ngOnInit() {
    //subscribe to vote observable and populate pair and tally.
    this.vote.subscribe(vote => {
      if (vote) {
        this.votePair = vote.get('pair');
        this.votePair.map(item => this.voteTally[item] = vote.getIn(['tally', item], 0) );
      }
    });
  }

  /**
   * next button handler
   */
  next() {
    this.vottingActions.next();
  }
}