import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Order, OrdersService } from '@frontend/orders';
import { IOrderItemResponse } from '../../../../../../../libs/orders/src/lib/models/order-item-response';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [
  ]
})
export class OrdersDetailComponent implements OnInit {
  order: Order = {};

  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this._getOrder();
  }

  deleteOrder(orderId: string) {}

  private _getOrder() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.orderService
          .getOrder(params.id)
          .subscribe((res: IOrderItemResponse) => {
            this.order = res.order;
          });
      }
    });
  }
}
