import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CategoriesListResponse } from '@frontend/products';
import { Category } from '@frontend/products';
import { CategoriesService } from '@frontend/products';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: []
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  endSubs$: Subject<any> = new Subject<any>();

  constructor(
    private categoryService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this._getCategories();
    this.endSubs$.complete();
  }

  ngOnDestroy(): void {
    this.endSubs$.next()
    this.endSubs$.complete();
  }

  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this category?',
      header: 'Delete Category',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.categoryService.deleteCategory(categoryId)
          .subscribe(() => {
            this._getCategories();
            this.messageService.add({
              severity: 'success',
              summary: 'Success!',
              detail: 'Category is deleted!'
            });
          }, (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error!',
              detail: error.message
            });
          });
      },
      reject: () => {}
    });
  }

  updateCategory(categoryId: string): void {
    this.router.navigateByUrl(`categories/form/${categoryId}`);
  }

  private _getCategories() {
    this.categoryService.getCategories()
      .pipe(
        takeUntil(this.endSubs$)
      )
      .subscribe((data: CategoriesListResponse) => {
        this.categories = data.categoryList;
      });
  }
}
