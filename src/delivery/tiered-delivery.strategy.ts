import { Injectable } from '@nestjs/common';
import {
  DeliveryRule,
  DeliveryTier,
} from '../shared/types/delivery-rule.interface';

/**
 * Implements tiered delivery pricing based on basket total
 */
@Injectable()
export class TieredDeliveryStrategy implements DeliveryRule {
  private readonly tiers: DeliveryTier[] = [
    { threshold: 90, charge: 0 }, // Orders $90 or more: free delivery
    { threshold: 50, charge: 2.95 }, // Orders $50-89.99: $2.95 delivery
    { threshold: 0, charge: 4.95 }, // Orders under $50: $4.95 delivery
  ];

  /**
   * Calculate delivery charge based on basket subtotal
   * @param subtotal The total cost of items in the basket before delivery
   * @returns The delivery charge based on the tiered pricing rules
   */
  calculateDeliveryCharge(subtotal: number): number {
    // Find the first tier where the subtotal meets or exceeds the threshold
    const applicableTier = this.tiers.find(
      (tier) => subtotal >= tier.threshold,
    );

    // Return the charge for the applicable tier (defaults to highest charge if no tier found)
    return applicableTier?.charge ?? this.tiers[this.tiers.length - 1].charge;
  }
}
