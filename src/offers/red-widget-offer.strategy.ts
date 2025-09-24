import { Injectable } from '@nestjs/common';
import { SpecialOffer } from '../shared/types/special-offer.interface';
import { Basket } from '../shared/types/basket.interface';
import { ProductCode } from '../shared/types/product.interface';

/**
 * Implements "buy one red widget, get the second half price" offer
 */
@Injectable()
export class RedWidgetOfferStrategy implements SpecialOffer {
  /**
   * Calculate discount for red widgets in the basket
   * @param basket The basket to calculate discounts for
   * @returns The total discount amount
   */
  calculateDiscount(basket: Basket): number {
    // Find red widgets in the basket
    const redWidgets = basket.items.find(
      (item) => item.product.code === ProductCode.RED_WIDGET,
    );

    if (!redWidgets || redWidgets.quantity < 2) {
      return 0;
    }

    // Calculate number of complete pairs
    const pairs = Math.floor(redWidgets.quantity / 2);

    // For each pair, we give half price discount on the second widget
    const discountPerPair = redWidgets.product.price / 2;
    const totalDiscount = pairs * discountPerPair;

    // Return rounded discount
    return Math.round(totalDiscount * 100) / 100;
  }
}
