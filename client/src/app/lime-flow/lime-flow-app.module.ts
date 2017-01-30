import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {LimeFlowAppRoutingModule} from "./lime-flow-app-routing.module";
import {LimeFlowComponent} from "./components/lime-flow/lime-flow.component";
import {LimeStateComponent} from "./components/lime-state/lime-state.component";
import {CommonGraphService} from "./services/common-graph.service";
import {LimeNotFoundComponent} from "./components/lime-not-found/lime-not-found.component";
import {GraphService} from "./services/graph.service";
import {LimeFlowAppComponent} from "./lime-flow-app.component";
/**
 * Created by mpaoluc on 13/01/2017.
 */

@NgModule({
  imports: [ CommonModule, LimeFlowAppRoutingModule ],
  declarations: [
    LimeFlowAppComponent,
    LimeFlowComponent,
    LimeStateComponent,
    LimeNotFoundComponent
  ],
  providers: [ CommonGraphService, GraphService ],
  exports: [ LimeFlowComponent ]
})
export class LimeFlowAppModule { }