import {LimeflowRoutingModule} from "./limeflow-routing.module";
import {CommonModule} from "@angular/common";
import {LimeFlowComponent} from "./lime-flow/limeFlow.component";
import {LimeStateComponent} from "./lime-state/limeState.component";
import {CommonGraphService} from "./services/common-graph.service";
import {NgModule} from "@angular/core";
/**
 * Created by mpaoluc on 13/01/2017.
 */

@NgModule({
  imports: [ CommonModule, LimeflowRoutingModule ],
  declarations: [
    LimeFlowComponent,
    LimeStateComponent,
  ],
  providers: [ CommonGraphService ]
})
export class LimeflowModule { }