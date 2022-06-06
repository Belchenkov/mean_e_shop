import { Component, Input, OnInit } from '@angular/core';

import { Product } from '@frontend/products';
import { CartService } from '../../../../../orders/src/lib/services/cart.service';
import { CartItem } from '../../../../../orders/src/lib/models/cart-item';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  styles: [
  ]
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product | undefined;

  constructor(
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
  }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product?.id,
      quantity: 1,
    };

    this.cartService.setCartItem(cartItem)
  }
}
