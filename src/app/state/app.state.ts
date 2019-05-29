import { App, Remix } from "../shared/interface";
import { CoffeeService } from "../core/services/coffee.service";
import {
  GetCoffeeListFailed,
  GetCoffeeList,
  AddToCart,
  RemoveCartItem,
  RemoveOneCartItem,
  EmptyCart,
  AddToCoffeeList,
  DummySetState,
  NextRunningNo,
  AddOneCartItem,
  GetCoffeeListSuccess
} from "./actions/app.actions";
import { State, Selector, Action, StateContext } from "@ngxs/store";
import { tap, mergeMap, catchError } from 'rxjs/operators';

export const getAppInitialState = (): App => ({
  coffeeList: [],
  cart: []
});

@State<App>({
  name: "app",
  defaults: getAppInitialState()
})
export class AppState {
  constructor(private coffeeSvc: CoffeeService) {}

  @Selector()
  static coffeeList(state: App) {
    return state.coffeeList;
  }

  @Selector()
  static totalCartAmount(state: App) {
    //console.log("totalCartAmount func in appstate : ", state);
    const priceList = state.cart.map(c => {
      const unitPrice = state.coffeeList.find(x => x.name === c.name).price;
      //console.log("prices are ",unitPrice, c.quantity);
      return unitPrice * c.quantity;
    });
    const sum = priceList.reduce((acc, curr) => acc + curr, 0);

    return sum;
  }

  @Selector()
  static totalCartQuantity(state: App) {
    //console.log("totalCartQuantity", state, state.cart);
    const total = state.cart.map(item => item.quantity).reduce((acc, curr) => acc + curr, 0);

    return total;
  }

  // @Action(GetCoffeeList)
  // async getCoffeeList(ctx: StateContext<App>, action: GetCoffeeList) {
  //   try {
  //     const coffeeList = await this.coffeeSvc.getList();

  //     const state = ctx.getState();

  //     ctx.setState({
  //       ...state,
  //       coffeeList
  //     });
  //   } catch (error) {
  //     ctx.dispatch(new GetCoffeeListFailed(error));
  //   }
  // }

  @Action(GetCoffeeList)
  getCoffeeList$(ctx: StateContext<App>, action: GetCoffeeList) {
      return this.coffeeSvc.getAll().pipe(
          tap(coffeeList => {
              const state = ctx.getState();

              console.log("getCoffeeList action call: ", state)

              ctx.setState({
                  ...state,
                  coffeeList
              });
          }),
          catchError(() => ctx.dispatch(new GetCoffeeListFailed()))
      )

  }

  // @Action(GetCoffeeList)
  // getCoffeeList$(ctx: StateContext<App>, action: GetCoffeeList) {
  //     return this.coffeeSvc.getAll()
  //         .pipe(
  //             mergeMap(x => ctx.dispatch(new GetCoffeeListSuccess(x))),
  //             catchError(() => ctx.dispatch(new GetCoffeeListFailed()))
  //         );
  // }

  // @Action(GetCoffeeListSuccess)
  // getCoffeeListSuccess(ctx: StateContext<App>, action: GetCoffeeListSuccess) {
  //     const state = ctx.getState();

  //     const current = {
  //         coffeeList: action.payload
  //     };

  //     ctx.setState({
  //         ...state,
  //         ...current
  //     });
  // }

  @Action(GetCoffeeListFailed)
  getCoffeeListFailed(ctx: StateContext<App>, action: GetCoffeeListFailed) {
      const state = ctx.getState();
      console.log('here');

      const current = {
          coffeeList: []
      };

      ctx.setState({
          ...state,
          ...current
      });
  }

  @Action([AddToCart, AddOneCartItem])
  addToCart(ctx: StateContext<App>, action: AddToCart) {
    const state = ctx.getState();

    // find cart item by item name
    const { quantity = 0 } =
      state.cart.find(x => x.name === action.payload) || {};

      //console.log('AddToCart func', state.cart.filter(x => x.name !== action.payload), quantity )

    const current = {
      cart: [
        ...state.cart.filter(x => x.name !== action.payload),
        {
          name: action.payload,
          quantity: quantity + 1
        }
      ]
    };

    ctx.setState({
      ...state,
      ...current
    });
  }

  @Action(RemoveCartItem)
  removeCartItem(ctx: StateContext<App>, action: RemoveCartItem) {
    const state = ctx.getState();

    const current = {
      cart: [...state.cart.filter(x => x.name !== action.payload)]
    };

    ctx.setState({
      ...state,
      ...current
    });
  }

  @Action(RemoveOneCartItem)
  removeOneCartItem(ctx: StateContext<App>, action: RemoveOneCartItem) {
    const state = ctx.getState();

    const item = state.cart.find(x => x.name === action.payload);

    const current = {
      cart: [
        ...state.cart.filter(x => x.name !== action.payload),
        ...(item.quantity - 1 <= 0
          ? []
          : [{ name: item.name, quantity: item.quantity - 1 }])
      ]
    };

    ctx.setState({
      ...state,
      ...current
    });
  }

  @Action(EmptyCart)
  emptyCart(ctx: StateContext<App>, action: EmptyCart) {
    const state = ctx.getState();

    const current = {
      cart: []
    };

    ctx.setState({
      ...state,
      ...current
    });
  }

  @Action(AddToCoffeeList)
  addToCoffeeList(ctx: StateContext<App>, action: AddToCoffeeList) {
    const state = ctx.getState();

    const current = {
      coffeeList: [...state.coffeeList, ...action.payload]
    };

    ctx.setState({
      ...state,
      ...current
    });
  }

  @Action(DummySetState)
  dummySetState(ctx: StateContext<App>, action: DummySetState) {
    const state = ctx.getState();

    const current = {
      ...action.payload
    };

    ctx.setState({
      ...state,
      ...current
    });
  }
}

export const getRemixInitialState = (): Remix => ({
  runningNo: 1
});

@State<Remix>({
  name: "remix",
  defaults: {
    runningNo: 1
  }
})
export class RemixState {
  @Action(NextRunningNo)
  nextRunningNo(ctx: StateContext<Remix>, action: NextRunningNo) {
    const state = ctx.getState();

    const current = {
      runningNo: state.runningNo + 1
    };

    ctx.setState({
      ...state,
      ...current
    });
  }
}
