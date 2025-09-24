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

    // Calculate number of pairs eligible for discount
    const discountPairs = Math.floor(redWidgets.quantity / 2);

    // Calculate discount amount (half price for second item in each pair)
    const discountPerPair = redWidgets.product.price / 2;
    return discountPairs * discountPerPair;
  }
}
