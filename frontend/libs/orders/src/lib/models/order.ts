import { OrderItem } from './order-item';
import { IUser } from '@frontend/users';

export class Order {
  id?: string;
  orderItems?: any[] | undefined;
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string;
  status?: number;
  totalPrice?: string;
  user?: IUser;
  dateOrdered?: string;
}
