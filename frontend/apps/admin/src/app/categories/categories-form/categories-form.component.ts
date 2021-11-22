import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
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

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
    });
  }

  get categoryForm() {
    return this.form.controls;
  }

  onSubmit(e: Event): void {
    e.preventDefault();

    this.isSubmitted = true;
    if (this.form.invalid) return;

    const category: Category = {
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
    };

    this.categoriesService.createCategory(category)
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Category is created!'
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
