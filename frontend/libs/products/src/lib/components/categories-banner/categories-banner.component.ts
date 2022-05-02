import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CategoriesListResponse, Category } from '@frontend/products';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'products-categories-banner',
  templateUrl: './categories-banner.component.html',
  styles: [
  ]
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  endSubs$: Subject<any> = new Subject<any>();

  constructor(
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.categoriesService.getCategories()
      .pipe((takeUntil(this.endSubs$)))
      .subscribe((response: CategoriesListResponse) => {
        if (response.success) {
          this.categories = response.categoryList;
        }
      });
  }

  ngOnDestroy() {
    this.endSubs$.next();
    this.endSubs$.complete();
  }
}
