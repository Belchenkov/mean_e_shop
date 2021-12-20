import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';

import { CategoriesService, Category } from '@frontend/products';

@Component({
  selector: 'frontend-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted: boolean = false;
  editMode: boolean = false;
  currentCategoryId: string;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff'],
    });
    this._checkEditMode();
  }

  get categoryForm() {
    return this.form.controls;
  }

  onSubmit(e: Event): void {
    e.preventDefault();

    this.isSubmitted = true;
    if (this.form.invalid) return;

    const category: Category = {
      id: this.currentCategoryId,
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
      color: this.categoryForm.color.value,
    };

    if (this.editMode) {
      this._updateCategory(category);
    } else {
      this._addCategory(category);
    }
  }

  private _checkEditMode(): void {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.editMode = true;
        this.currentCategoryId = params.id;
        this.categoriesService.getCategory(this.currentCategoryId)
          .subscribe((category: Category) => {
            this.categoryForm.name.setValue(category.name);
            this.categoryForm.icon.setValue(category.icon);
            this.categoryForm.color.setValue(category.color);
          });
      }
    });
  }

  private _updateCategory(category: Category): void {
    this.categoriesService.updateCategory(category)
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: `Category ${category.name} is updated!`
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

  private _addCategory(category: Category): void {
    this.categoriesService.createCategory(category)
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: `Category ${category.name} is created!`
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
}
