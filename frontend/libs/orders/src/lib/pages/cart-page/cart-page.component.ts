import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
export class CartPageComponent implements OnInit {
  quantity: string = '0';
  cartItemsDetailed: ICartItemDetailed[] = [];

  constructor(
    private router: Router,
    private cartService: CartService,
    private ordersService: OrdersService,
  ) { }

  ngOnInit(): void {
    this._getCartDetails();
  }

  backToShop(): void {
    this.router.navigate(['/products']);
  }

  deleteCartItem() {

  }

  private _getCartDetails(): void {
    this.cartService
      .cart$
      .pipe()
      .subscribe((response: Cart) => {
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
}
