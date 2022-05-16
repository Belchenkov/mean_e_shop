import { Component, OnInit } from '@angular/core';

import {
  CategoriesListResponse,
  CategoriesService, Category,
  Product,
  ProductsListResponse,
  ProductsService
} from '@frontend/products';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
  ) { }

  ngOnInit(): void {
    this._getProducts();
    this._getCategories();
  }

  public categoryFilter() {
    const selectedCategories = this.categories
      .filter((category: Category) => category.checked)
      .map((category: Category) => category.id);

    this._getProducts(selectedCategories);
  }

  private _getProducts(selectedCategories?: string[]) {
    this.productsService.getProducts(selectedCategories)
      .subscribe((response: ProductsListResponse) => {
        if (response.success) {
          this.products = response.products;
        }
      });
  }

  private _getCategories() {
    this.categoriesService.getCategories()
      .subscribe((response: CategoriesListResponse) => {
        if (response.success) {
          this.categories = response.categoryList;
        }
      });
  }
}
