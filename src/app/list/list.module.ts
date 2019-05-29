
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ListRoutingModule } from './list-routing.module';

 

@NgModule({
  imports: [ListRoutingModule, SharedModule],
  declarations: [ListRoutingModule.components]
})
 

export class ListModule {
}

 