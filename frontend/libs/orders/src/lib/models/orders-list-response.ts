import { Order } from '@frontend/orders';

export interface IOrdersListResponse {
  success: boolean;
  orderList: Order[];
}
