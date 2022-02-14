import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

import { Order, OrdersService } from '@frontend/orders';
import { IOrderItemResponse } from '../../../../../../../libs/orders/src/lib/models/order-item-response';
import { ORDER_STATUS } from '../order.constants';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [
  ]
})
export class OrdersDetailComponent implements OnInit {
  order: Order = {};
  orderStatuses: Array<{ id: string; name: any; }> = [];
  selectedStatus: any;

  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }

  deleteOrder(orderId: string) {}

  onStatusChange(event: any) {
    this.orderService.updateOrder({ status: event.value }, this.order.id)
      .subscribe((res: IOrderItemResponse) => {
        if (res.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Order is updated!'
          });
        }
      }, (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
        });
      })
  }

  private _getOrder() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.orderService
          .getOrder(params.id)
          .subscribe((res: IOrderItemResponse) => {
            this.order = res.order;
            this.selectedStatus = res.order.status;
          });
      }
    });
  }

  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map(key => {
      return {
        id: key,
        // @ts-ignore
        name: ORDER_STATUS[key].label,
      };
    });
  }
}
