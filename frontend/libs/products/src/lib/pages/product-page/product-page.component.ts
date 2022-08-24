import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Product } from '@frontend/products';
import { IProductItemResponse } from '../../models/product-item-response';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../../../../orders/src/lib/services/cart.service';
import { CartItem } from '../../../../../orders/src/lib/models/cart-item';

@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
  styles: [
  ]
})
export class ProductPageComponent implements OnInit, OnDestroy {
  product: Product = {};
  quantity: number = 1;
  endSubs$: Subject<any> = new Subject<any>();

  constructor(
    private prodService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService,
  ) { }

  get beforePrice(): number {
    // @ts-ignore
    return this.product.price + 18;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.productId) {
        this._getProduct(params.productId);
      }
    });
  }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: this.quantity,
    };

    this.cartService.setCartItem(cartItem);
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  private _getProduct(productId: string) {
    this.prodService.getProduct(productId)
        .pipe(
        takeUntil(this.endSubs$)
      )
      .subscribe((response: IProductItemResponse) => {
        if (response.success) {
          this.product = response.product;
        }
      })
  }
}
