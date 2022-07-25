import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';
import { OrdersService } from '../../services/orders.service';
import { IProductItemResponse } from '../../../../../products/src/lib/models/product-item-response';
import { ICartItemDetailed } from '../../models/cart-item-detailed';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit, OnDestroy {
  quantity = '0';
  cartItemsDetailed: ICartItemDetailed[] = [];
  cartCount = 0;
  endSubs$: Subject<any> = new Subject<any>();

  constructor(
    private router: Router,
    private cartService: CartService,
    private ordersService: OrdersService,
  ) { }

  ngOnInit(): void {
    this._getCartDetails();
  }

  ngOnDestroy() {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  backToShop(): void {
    this.router.navigate(['/products']);
  }

  deleteCartItem(cartItem: ICartItemDetailed) {
    this.cartService.deleteCartItem(cartItem.product?.id);
  }

  private _getCartDetails(): void {
    this.cartService
      .cart$
      .pipe(
        takeUntil(this.endSubs$)
      )
      .subscribe((response: Cart) => {
        this.cartItemsDetailed = [];
        this.cartCount = response?.items.length ?? 0;

        response.items.forEach(cartItem => {
          this.ordersService.getProduct(cartItem.productId)
            .subscribe((res: IProductItemResponse) => {
              if (res.success) {
                this.cartItemsDetailed.push(<ICartItemDetailed>{
                  product: res.product,
                  quantity: cartItem.quantity,
                });
              }
            });
        });
      });
  }

  getPrice(item: ICartItemDetailed): number {
    // @ts-ignore
    return item?.product?.price * item?.quantity;
  }

  updateCartItemQuantity(event: { value: number }, cartItem: ICartItemDetailed) {
    this.cartService.setCartItem({
      productId: cartItem.product.id,
      quantity: event.value,
    }, true);
  }
}
