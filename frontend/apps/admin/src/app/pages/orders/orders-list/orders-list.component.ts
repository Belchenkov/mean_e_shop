import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

import { ORDER_STATUS } from '../order.constants';
import { Order, OrdersService } from '@frontend/orders';
import { IOrdersListResponse } from '../../../../../../../libs/orders/src/lib/models/orders-list-response';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  orderStatus = ORDER_STATUS;

  constructor(
    private ordersService: OrdersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this._getOrders();
  }

  showOrder(orderId: number) {
    this.router.navigateByUrl(`orders/${orderId}`);
  }

  deleteOrder(orderId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Order?',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService.deleteOrder(orderId).subscribe(
          () => {
            this._getOrders();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Order is deleted!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Order is not deleted!'
            });
          }
        );
      }
    });
  }

  private _getOrders() {
    this.ordersService.getOrders()
      .subscribe((res: IOrdersListResponse) => {
        if (res.success) {
          this.orders = res.orderList;
        }
    });
  }
}
