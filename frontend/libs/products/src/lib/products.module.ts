import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { OrdersModule } from '@frontend/orders';
import { ProductsSearchComponent } from './components/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';

@NgModule({
    imports: [
        CommonModule,
        OrdersModule,
        RouterModule,
        ButtonModule
    ],
    declarations: [
      ProductsSearchComponent,
      CategoriesBannerComponent,
      ProductItemComponent,
      FeaturedProductsComponent
    ],
    exports: [
      ProductsSearchComponent,
      CategoriesBannerComponent,
      ProductItemComponent,
      FeaturedProductsComponent,
    ]
})
export class ProductsModule {}
