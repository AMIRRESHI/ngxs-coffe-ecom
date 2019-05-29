
import { NgModule } from '@angular/core';

import { CartRoutingModule } from './cart-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CartRoutingModule, SharedModule],
  declarations: [CartRoutingModule.components]
})
export class CartModule {
}

