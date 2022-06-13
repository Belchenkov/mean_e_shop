import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';

@NgModule({
    imports: [
      CommonModule,
      RouterModule,
    ],
    declarations: [
      CartIconComponent
    ],
    exports: [
      CartIconComponent
   ]
})
export class OrdersModule {
  constructor(
    private cartService: CartService,
  ) {
    cartService.initCartLocalStorage();
  }
}
