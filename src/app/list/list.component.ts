import { Component, OnInit } from '@angular/core';
import { AppState } from '../state/app.state';
import { Select, Store } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { App } from '../shared/interface';
import { GetCoffeeList, AddToCart } from '../state/actions/app.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Select(AppState.coffeeList)
  list$;

  //list$ = this.store.select( x =>  x.app.coffeeList)

  isFeatureRemixOn = environment.features.remix;

  constructor(private router: Router, private store: Store) {
    // this.list$.subscribe( x => console.log('ListComponent con' , x ));
    
  }

  ngOnInit() {
    const isListPopulated = this.store.selectSnapshot<App>(x => x.app.coffeeList.length);

    console.log('ListComponent isListPopulated', this.store.selectSnapshot<App>(x => x.app.coffeeList.length), isListPopulated);
    
    if (isListPopulated) { return; }
    this.store.dispatch(new GetCoffeeList());

    // this.store.selectOnce(x => x.app.coffeeList.length)
    //   .subscribe(x => {
    //     if (x) { return; }
    //     this.store.dispatch(new GetCoffeeList());
    //   });

  }

  addToCart(name: string) {
    this.store.dispatch(new AddToCart(name));
  }

  addToCartAndCheckout(name: string) {
    this.addToCart(name);
    this.router.navigateByUrl('/cart');
  }

}
