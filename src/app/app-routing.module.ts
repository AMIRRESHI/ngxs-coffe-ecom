import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, NoPreloading } from '@angular/router';

import { PreloadModulesStrategy } from './core/strategies/preload-modules.strategy';

const app_routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/menu' },
  { path: 'menu', loadChildren: 'src/app/list/list.module#ListModule' },
  { path: 'cart', loadChildren: 'src/app/cart/cart.module#CartModule' },
  { path: 'remix', loadChildren: 'src/app/remix/remix.module#RemixModule' },
  { path: '**', pathMatch: 'full', redirectTo: '/menu'} // catch any unfound routes and redirect to home page
];

@NgModule({
  imports: [ RouterModule.forRoot(app_routes, { preloadingStrategy: PreloadAllModules }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
