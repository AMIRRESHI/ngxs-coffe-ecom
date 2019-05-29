
import { NgModule } from '@angular/core';

import { HeaderRoutingModule } from './header-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [HeaderRoutingModule, SharedModule],
  declarations: [HeaderRoutingModule.components]
})
export class HeaderModule {
}

