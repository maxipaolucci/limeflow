import { Routes, RouterModule } from '@angular/router';

import {LimeFlowComponent} from "./components/lime-flow/limeFlow.component";

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/workflow',
    pathMatch: 'full'
  },
  {
    path: 'workflow',
    component: LimeFlowComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes);
