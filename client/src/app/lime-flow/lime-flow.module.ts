import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {LimeFlowRoutingModule} from "./lime-flow-routing.module";
import {LimeFlowComponent} from "./lime-flow.component";
import {LimeStateComponent} from "./components/lime-state/lime-state.component";
import {CommonGraphService} from "./services/common-graph.service";
/**
 * Created by mpaoluc on 13/01/2017.
 */

@NgModule({
  imports: [ CommonModule, LimeFlowRoutingModule ],
  declarations: [
    LimeFlowComponent,
    LimeStateComponent,
  ],
  providers: [ CommonGraphService ]
})
export class LimeFlowModule { }