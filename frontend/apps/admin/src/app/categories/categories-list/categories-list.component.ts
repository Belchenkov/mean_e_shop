import { Component, OnInit } from '@angular/core';

import { CategoriesListResponse } from '@frontend/products';
import { Category } from '@frontend/products';
import { CategoriesService } from '@frontend/products';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    private categoryService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data: CategoriesListResponse) => {
      this.categories = data.categoryList;
    });
  }

}
