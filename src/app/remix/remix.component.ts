import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Coffee } from '../shared/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs/operators';
import { AddToCoffeeList, AddToCart, NextRunningNo } from '../state/actions/app.actions';

@Component({
  selector: 'app-remix',
  templateUrl: './remix.component.html',
  styleUrls: ['./remix.component.css']
})
export class RemixComponent implements OnInit {

  destroy$ = new Subject();

  ingredients = [
    'chocolate syrup',
    'espresso',
    'milk foam',
    'steamed milk',
    'whipped cream',
    'water'
  ];

  coffee: Coffee;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store) { }

  ngOnInit() {
    const { template = '' } = this.route.snapshot.queryParams;

    console.log('template valu: ', template);

    this.store.select(x => ({
      //test: console.log('RemixComponent ', x.app.coffeeList.find(c => c), x.app.coffeeList.find(c => c.name) === template),
      template: x.app.coffeeList.find(c => c.name === template),
      runningNo: x.remix.runningNo
    }))
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(x => {
        // get template recipe if any
        
        const templateRecipe = x.template ? x.template.recipe : [];
        console.log("check template recipe: ",  x, x.template, templateRecipe  )
        // merge template recipe with default recipe
        const recipe = this.ingredients.map(ing => {
          console.log('check for templateRecipe:', templateRecipe.find(r => r.name === ing),  { name: ing, quantity: 0 })
          const item = templateRecipe.find(r => r.name === ing) || { name: ing, quantity: 0 };
          console.log('check for item var: ', item, { ...item });
          return { ...item };
        });

        console.log('check for runningno. ', x.runningNo.toString().padStart(2, '0'))

        this.coffee = {
          name: 'Special Cafe ' + x.runningNo.toString().padStart(2, '0'),
          price: 20,
          recipe
        };

        console.log('check for coffee obj. ', this.coffee)
      });
  }

  addToCart(coffee: any) {
    // actions
    this.store.dispatch(new AddToCoffeeList([coffee]));
    this.store.dispatch(new AddToCart(coffee.name));
    this.store.dispatch(new NextRunningNo());
    // route
    this.router.navigateByUrl('/cart');
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
