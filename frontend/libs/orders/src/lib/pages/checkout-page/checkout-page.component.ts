import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from '@frontend/users';
import { OrderItem } from '@frontend/orders';

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
  styles: [
  ]
})
export class CheckoutPageComponent implements OnInit {

  constructor(
    private router: Router,
    private usersService: UsersService,
    private formBuilder: FormBuilder
  ) {}

  // @ts-ignore
  checkoutFormGroup: FormGroup;
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  countries = [];

  get checkoutForm() {
    return this.checkoutFormGroup?.controls;
  }

  ngOnInit(): void {
    this._initCheckoutForm();
    this._getCountries();
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup?.invalid) {
      return;
    }
  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  private _getCountries() {
    this.countries = this.usersService.getCountries();
  }
}
