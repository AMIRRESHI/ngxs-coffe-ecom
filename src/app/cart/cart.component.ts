import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AddOneCartItem, RemoveOneCartItem, RemoveCartItem } from '../state/actions/app.actions';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartList$ = this.store
    // list of cart coffee object
    .select(x => x.app.cart.map(item => {
      // get coffee object by name
      const { price, ...props } = x.app.coffeeList.find(c => c.name === item.name);

      // console.log('CartComponent checking on coffe object: ', price, props, { price, ...props }, 
      // {
      //   quantity: item.quantity,
      //   unitPrice: price,
      //   price: item.quantity * price, // sum quantity
      //   ...props,
      // })


      return {
        quantity: item.quantity,
        unitPrice: price,
        price: item.quantity * price, // sum quantity
        ...props,
      };
    })).pipe(
      // sort by name
      map(x => x.sort((a, b) => a.name < b.name ? -1 : 1))
    );

  constructor(private store: Store, private router: Router) { }

  ngOnInit() {
  }

  addOneItem(name) {
    this.store.dispatch(new AddOneCartItem(name));
  }

  removeOneItem(name) {
    this.store.dispatch(new RemoveOneCartItem(name));
  }

  removeItem(name) {
    this.store.dispatch(new RemoveCartItem(name));
  }

}
