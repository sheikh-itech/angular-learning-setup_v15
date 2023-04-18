import { createAction, props } from '@ngrx/store';
import { CartItem } from './cart-item.model';

export const addItemToCart = createAction(
  '[Shopping Cart] Add Item',
  props<{ item: CartItem }>()
);

export const removeItemFromCart = createAction(
  '[Shopping Cart] Remove Item',
  props<{ itemId: string }>()
);

export const clearCart = createAction('[Shopping Cart] Clear Cart');
