import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

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
    private categoryService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this._getCategories();
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

  private _getCategories() {
    this.categoryService.getCategories()
      .subscribe((data: CategoriesListResponse) => {
        this.categories = data.categoryList;
      });
  }
}
