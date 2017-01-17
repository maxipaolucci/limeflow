/**
 * Created by mpaoluc on 13/01/2017.
 */
import { Component } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  template: '<h2>Lime {{componentType}} component with ID "{{componentId}}" not found.</h2>'
})
export class LimeNotFoundComponent {

  private componentType : string;
  private componentId : string;

  constructor(private route: ActivatedRoute) {
    this.componentId = null;
    this.componentType = null;
  }

  ngOnInit() : void {
    let methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging

    //
    this.route.params.subscribe((params: Params) => {
      this.componentId = params['componentId'];
      this.componentType = params['componentType'];
    });
  }
}