import { Product } from './product.interface';

/**
 * Represents a basket containing products and their quantities
 */
export interface Basket {
  items: BasketItem[];
}

/**
 * Represents a product and its quantity in the basket
 */
export interface BasketItem {
  product: Product;
  quantity: number;
}
