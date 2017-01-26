import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {LimeFlowRoutingModule} from "./lime-flow-routing.module";
import {LimeFlowComponent} from "./lime-flow.component";
import {LimeStateComponent} from "./components/lime-state/lime-state.component";
import {CommonGraphService} from "./services/common-graph.service";
import {LimeNotFoundComponent} from "./components/lime-not-found/lime-not-found.component";
import {GraphService} from "./services/graph.service";
/**
 * Created by mpaoluc on 13/01/2017.
 */

@NgModule({
  imports: [ CommonModule, LimeFlowRoutingModule ],
  declarations: [
    LimeFlowComponent,
    LimeStateComponent,
    LimeNotFoundComponent
  ],
  providers: [ CommonGraphService, GraphService ],
  exports: [ LimeFlowComponent ]
})
export class LimeFlowModule { }