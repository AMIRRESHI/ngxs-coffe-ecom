import { Component, OnInit } from '@angular/core';

import { Select, Store } from '@ngxs/store';

import { AppState } from 'src/app/state/app.state';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { App } from 'src/app/shared/interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Select(AppState.totalCartQuantity) 
  cartCount$;
  //@Select(AppState.totalCartQuantity) cartCount$: Observable<App>; // also can be written as of type Observable<App>
  // cartCount$ = this.store.select(x => x.app.cart.map(item => item.quantity).reduce((acc, curr) => acc + curr, 0));
  isFeatureRemixOn = environment.features.remix;

  constructor(private store: Store) { }

  ngOnInit() {
  }

}
