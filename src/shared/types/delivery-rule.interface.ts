/**
 * Strategy interface for calculating delivery charges based on basket total
 */
export interface DeliveryRule {
  /**
   * Calculate delivery charge for a given basket subtotal
   * @param subtotal The total cost of items in the basket before delivery
   */
  calculateDeliveryCharge(subtotal: number): number;
}

/**
 * Configuration for tiered delivery pricing rules
 */
export interface DeliveryTier {
  threshold: number;
  charge: number;
}
