import { Basket } from './basket.interface';

/**
 * Strategy interface for applying special offers to basket items
 */
export interface SpecialOffer {
  /**
   * Calculate discount amount for a basket based on the offer rules
   * @param basket The basket to calculate discounts for
   */
  calculateDiscount(basket: Basket): number;
}
