import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

import { Product, ProductsListResponse, ProductsService } from '@frontend/products';
import { IProductItemResponse } from '../../../../../../../libs/products/src/lib/models/product-item-response';

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
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this._getProducts();
  }

  updateProduct(productId: string): void {
    this.router.navigateByUrl(`products/form/${productId}`);
  }

  deleteProduct(productId: string): void {
    this.confirmationService.confirm({
      message: 'Do you want to delete this category?',
      header: 'Delete Product',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.productsService.deleteProduct(productId)
          .subscribe((res: IProductItemResponse) => {
            if (res.success) {
              this._getProducts();
              this.messageService.add({
                severity: 'success',
                summary: 'Success!',
                detail: 'Product is deleted!'
              });
            }
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

  private _getProducts() {
    this.productsService.getProducts()
      .subscribe((res: ProductsListResponse) => {
        if (res.success) {
          this.products = res.products;
        }
      })
  }

}
