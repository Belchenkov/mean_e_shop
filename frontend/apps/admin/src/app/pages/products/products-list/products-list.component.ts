import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product, ProductsListResponse, ProductsService } from '@frontend/products';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this._getProducts();
  }

  updateProduct(productId: string): void {
    this.router.navigateByUrl(`products/form/${productId}`);
  }

  deleteProduct(productId: string): void {

  }

  private _getProducts() {
    this.productsService.getProducts()
      .subscribe((res: ProductsListResponse) => {
        if (res.success) {
          this.products = res.products;
        }
      })
  }

}
