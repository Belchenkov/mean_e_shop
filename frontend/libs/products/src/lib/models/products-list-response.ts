import { Product } from './product';

export interface ProductsListResponse {
  success: boolean;
  products: Product[]
}
