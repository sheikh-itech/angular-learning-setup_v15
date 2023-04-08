import { createReducer, on } from '@ngrx/store';
import { Action } from 'rxjs/internal/scheduler/Action';
import { addItemToCart, removeItemFromCart, clearCart } from './cart-action';
import { CartState, initialCartState } from './cart-state';

export const shoppingCartReducer = createReducer(
  initialCartState,
  on(addItemToCart, (state, { item }) => {
    const items = [...state.items, item];
    const total = state.total + item.price;
    return { ...state, items, total };
  }),
  on(removeItemFromCart, (state, { itemId }) => {
    let id:number = parseInt(itemId);
    let items: any;
    items = state.items.filter(item => item.id !== id);
    const total = state.total - items.find((item: any) => item.id === id)?.price;
    return { ...state, items, total };
  }),
  on(clearCart, () => initialCartState)
);

