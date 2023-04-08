import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addItemToCart, clearCart, removeItemFromCart } from './cart-action';
import { CartItem } from './cart-item.model';

@Component({
  selector: 'app-shopping-cart',
  template: `
    <h2>Shopping Cart</h2>
    <ul>
      <li *ngFor="let item of items$">{{ item.name }} - {{ item.price }}</li>
    </ul>
    <p>Total: {{ total$ }}</p>
    <button (click)="addItem()">Add Item</button>
    <button (click)="removeItem()">Remove Item</button>
    <button (click)="clearCart()">Clear Cart</button>
  `
})
export class ShoppingCartExample {
  items$: any;
  total$ = 0;

  constructor(private store: Store) { }

  addItem() {
    const item: CartItem = { id: 123, name: 'Product 1', price: 10, quantity:5 };
    this.store.dispatch(addItemToCart({ item }));
  }

  removeItem() {
    const itemId = '123';
    this.store.dispatch(removeItemFromCart({ itemId }));
  }

  clearCart() {
    this.store.dispatch(clearCart());
  }
}
