import { Component, OnInit } from '@angular/core';

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
  ) { }

  ngOnInit(): void {
    this._getProducts();
  }

  updateProduct(productId: string): void {

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
