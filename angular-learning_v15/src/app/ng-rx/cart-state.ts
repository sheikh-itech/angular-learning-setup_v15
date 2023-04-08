import { CartItem } from "./cart-item.model";

export interface CartState {
  items: Array<CartItem>;
  total: number;
}

export const initialCartState: CartState = {
  items: [],
  total: 0
};
