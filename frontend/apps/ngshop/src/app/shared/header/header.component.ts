import { Component, OnInit } from '@angular/core';

import { CartService } from '../../../../../../libs/orders/src/lib/services/cart.service';
import { Cart } from '../../../../../../libs/orders/src/lib/models/cart';

@Component({
  selector: 'eshop-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  cartCount = '0';

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart: Cart) => {
      // @ts-ignore
      this.cartCount = cart?.items.length ?? 0;
    });
  }
}
