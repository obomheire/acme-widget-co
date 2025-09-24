import { Injectable } from '@nestjs/common';
import { Product, ProductCode } from '../shared/types/product.interface';

/**
 * Service responsible for managing the product catalogue
 */
@Injectable()
export class CatalogueService {
  private readonly products: Product[] = [
    {
      name: 'Red Widget',
      code: ProductCode.RED_WIDGET,
      price: 32.95,
    },
    {
      name: 'Green Widget',
      code: ProductCode.GREEN_WIDGET,
      price: 24.95,
    },
    {
      name: 'Blue Widget',
      code: ProductCode.BLUE_WIDGET,
      price: 7.95,
    },
  ];

  /**
   * Get a product by its code
   * @param code The product code to look up
   * @returns The product if found, undefined otherwise
   */
  getProduct(code: string): Product | undefined {
    return this.products.find((product) => product.code === code);
  }

  /**
   * Get all products in the catalogue
   * @returns Array of all products
   */
  getAllProducts(): Product[] {
    return [...this.products];
  }
}
