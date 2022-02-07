import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

import {
  ProductsService,
  Category,
  CategoriesService, CategoriesListResponse, Product
} from '@frontend/products';
import { IProductItemResponse } from '../../../../../../../libs/products/src/lib/models/product-item-response';

@Component({
  selector: 'frontend-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted: boolean = false;
  editMode: boolean = false;
  currentProductId: string;
  imageDisplay: string | ArrayBuffer | null | undefined;
  categories: Category[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductsService,
    private categoryService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  get productForm() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this._initForm();
    this._checkEditMode();
    this._getCategories();
  }


  onSubmit(e: Event): void {
    e.preventDefault();

    this.isSubmitted = true;
    if (this.form.invalid) return;

    const productFormData = new FormData();

    Object.keys(this.productForm).map((key: string) => {
      productFormData.append(key, this.productForm[key].value);
    });

    if (this.editMode) {
      this._updateProduct(productFormData);
    } else {
      this._addProduct(productFormData);
    }
  }

  onImageUpload(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity();
    }
  }

  private _initForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [''],
    });
  }

  private _checkEditMode(): void {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.editMode = true;
        this.currentProductId = params.id;
        this.productService.getProduct(this.currentProductId)
          .subscribe((res: IProductItemResponse) => {
            if (res.success) {
              this.productForm.name.setValue(res.product.name);
              this.productForm.brand.setValue(res.product.brand);
              this.productForm.category.setValue(res.product.category?.id);
              this.productForm.price.setValue(res.product.price);
              this.productForm.countInStock.setValue(res.product.countInStock);
              this.productForm.isFeatured.setValue(res.product.isFeatured);
              this.productForm.description.setValue(res.product.description);
              this.productForm.richDescription.setValue(res.product.richDescription);
              this.imageDisplay = res.product.image;
              this.productForm.image.setValidators([]);
              this.productForm.image.updateValueAndValidity();
            }
          });
      }
    });
  }

  private _updateProduct(product: FormData): void {
    this.productService.updateProduct(product, this.currentProductId)
      .subscribe((res: IProductItemResponse) => {
        if (res.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success!',
            detail: `Product is updated!`
          });
          timer(2000)
            .toPromise()
            .then(() => this.location.back())
        }
      }, (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: error.message
        });
      })
  }

  private _addProduct(productData: FormData): void {
    this.productService.createProduct(productData)
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          // detail: `Product ${productData.name} is created!`
        });
        timer(2000)
          .toPromise()
          .then(() => this.location.back())
      }, (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: error.message
        });
      })
  }

  private _getCategories() {
    this.categoryService.getCategories()
      .subscribe((res: CategoriesListResponse) => {
        if (res.success) {
          this.categories = res.categoryList;
        }
      });
  }
}
