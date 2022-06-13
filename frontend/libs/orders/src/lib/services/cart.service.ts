import { Injectable } from '@angular/core';

import { Cart } from '../models/cart';
import { CartItem } from '../models/cart-item';
import { BehaviorSubject } from 'rxjs';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart$: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(this.getCart());

  constructor() { }

  initCartLocalStorage() {
    const cart: Cart = this.getCart();

    if (!cart) {
      const initialCart: Cart = {
        items: [],
      };

      localStorage.setItem(CART_KEY, JSON.stringify(initialCart));
    }
  }

  getCart(): Cart {
    return JSON.parse(<string>localStorage.getItem(CART_KEY));
  }

  setCartItem(cartItem: CartItem): Cart {
    const cart: Cart = this.getCart();

    const cartItemsExist = cart.items?.find((item: CartItem) => item.productId === cartItem.productId);

    if (cartItemsExist) {
      cart.items?.map((item: CartItem) => {
        if (item.productId === cartItem.productId) {
          // @ts-ignore
          item.quantity += cartItem.quantity;
        }

        return item;
      })
    } else {
      cart.items?.push(cartItem);
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));

    this.cart$.next(cart);

    return cart;
  }
}
