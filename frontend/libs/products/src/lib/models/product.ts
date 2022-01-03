import { Category } from './category';

export interface Product {
    id?: string;
    name?: string;
    description?: string;
    richDescription?: string;
    image?: string;
    images?: string[];
    brand?: string;
    price?: number;
    countInStock?: number;
    category?: Category;
    dateCreated?: string;
    rating?: number;
    numReviews?: number;
    isFeatured?: boolean;
}
