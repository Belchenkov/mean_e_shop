import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from '@frontend/users';
import { Order, OrderItem, OrdersService } from '@frontend/orders';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';
import { ORDER_STATUS } from '../../../../../../apps/admin/src/app/pages/orders/order.constants';

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
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private ordersService: OrdersService,
  ) {}

  // @ts-ignore
  checkoutFormGroup: FormGroup;
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  countries = [];
  userId = '60e42e3e0586ce3eca6781ba';

  get checkoutForm() {
    return this.checkoutFormGroup?.controls;
  }

  ngOnInit(): void {
    this._initCheckoutForm();
    this._cartService();
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

    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm.street.value,
      shippingAddress2: this.checkoutForm.apartment.value,
      city: this.checkoutForm.city.value,
      zip: this.checkoutForm.zip.value,
      country: this.checkoutForm.country.value,
      phone: this.checkoutForm.phone.value,
      // @ts-ignore
      status: Object.keys(ORDER_STATUS)[0],
      // @ts-ignore
      user: this.userId,
      dateOrdered: Date.now(),
    };

    this.ordersService.createOrder(order)
      .subscribe(() => {
        console.log('success');
      });
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

  private _getCountries(): void {
    // @ts-ignore
    this.countries = this.usersService.getCountries();
  }

  private _cartService() {
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items.map(item => {
      return {
        product: item.productId,
        quantity: item.quantity,
      };
    });
  }
}
