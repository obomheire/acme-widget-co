/**
 * Represents a product in the Acme Widget Co catalogue
 */
export interface Product {
  name: string;
  code: string;
  price: number;
}

/**
 * Product codes available in the catalogue
 */
export enum ProductCode {
  RED_WIDGET = 'R01',
  GREEN_WIDGET = 'G01',
  BLUE_WIDGET = 'B01',
}
