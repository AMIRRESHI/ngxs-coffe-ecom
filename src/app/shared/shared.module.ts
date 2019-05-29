import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { CupComponent } from "./cup/cup.component";
import { PayComponent } from "./pay/pay.component";

@NgModule({
  imports: [CommonModule],
  exports: [CommonModule, FormsModule, CupComponent, PayComponent],
  declarations: [CupComponent, PayComponent]
})
export class SharedModule {}
