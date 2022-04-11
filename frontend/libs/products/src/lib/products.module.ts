import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersModule } from '@frontend/orders';
import { ProductsSearchComponent } from './components/products-search.component';

@NgModule({
    imports: [
      CommonModule,
      OrdersModule,
    ],
    declarations: [
      ProductsSearchComponent
    ],
    exports: [
      ProductsSearchComponent,
    ]
})
export class ProductsModule {}
