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

  setCartItem(cartItem: CartItem, updateCartItem?: boolean): Cart {
    const cart: Cart = this.getCart();

    const cartItemsExist = cart.items?.find((item: CartItem) => item.productId === cartItem.productId);

    if (cartItemsExist) {
      cart.items?.map((item: CartItem) => {
        if (item.productId === cartItem.productId) {
          // @ts-ignore
          item.quantity = updateCartItem ? cartItem.quantity : item.quantity + cartItem.quantity;
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

  deleteCartItem(productId: string | undefined): void {
    const cart = this.getCart();

    cart.items = cart.items.filter(item => item.productId !== productId);

    const cartJsonString = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJsonString);

    this.cart$.next(cart);
  }

  emptyCart() {
    const initialCart: Cart = {
      items: [],
    };

    localStorage.setItem(CART_KEY, JSON.stringify(initialCart));
    this.cart$.next(initialCart);
  }
}
