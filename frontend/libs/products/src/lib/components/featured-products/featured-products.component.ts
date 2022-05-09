import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Product, ProductsListResponse } from '@frontend/products';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-featured-products',
  templateUrl: './featured-products.component.html',
  styles: [
  ]
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {
  featuredProducts: Product[] = [];
  endSubs$: Subject<any> = new Subject<any>();

  constructor(
    private prodService: ProductsService,
  ) { }

  ngOnInit(): void {
    this._getFeaturedProducts();
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  private _getFeaturedProducts() {
    this.prodService.getFeaturedProducts(4)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((response: ProductsListResponse) => {
        if (response.success) {
          this.featuredProducts = response.products;
        }
      });
  }
}
