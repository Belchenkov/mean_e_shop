import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CartService } from './services/cart.service';

@NgModule({
    imports: [
      CommonModule,
      RouterModule,
    ],
    declarations: [
    ],
    exports: [
   ]
})
export class OrdersModule {
  constructor(
    private cartService: CartService,
  ) {
    cartService.initCartLocalStorage();
  }
}
