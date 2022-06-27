import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';
import { ProductsService } from '../../../../../products/src/lib/services/products.service';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit {
  quantity: any;

  constructor(
    private router: Router,
    private cartService: CartService,
    private productService: ProductsService,
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
        response.items?.forEach(cartItem => {
          this.productService.getProduct(cartItem.productId)
            .subscribe()
        });
      });
  }
}
