import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { RemixRoutingModule } from "./remix-routing.module";

@NgModule({
  imports: [RemixRoutingModule, SharedModule],
  declarations: [RemixRoutingModule.components]
})
export class RemixModule {}
