import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { InputNumberModule } from 'primeng/inputnumber';
import { CartService } from './services/cart.service';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';

const routes: Routes = [
  {
    path: 'cart',
    component: CartPageComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    InputNumberModule,
  ],
    declarations: [
      OrderSummaryComponent,
      CartPageComponent
  ],
    exports: [
      OrderSummaryComponent,
      CartPageComponent
  ]
})
export class OrdersModule {
  constructor(
    private cartService: CartService,
  ) {
    cartService.initCartLocalStorage();
  }
}
