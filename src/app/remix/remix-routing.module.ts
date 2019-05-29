import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RemixComponent } from "./remix.component";

const routes: Routes = [
  {
    path: "",
    component: RemixComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemixRoutingModule {
  static components = [RemixComponent];
}
