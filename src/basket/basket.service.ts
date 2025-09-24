import { Injectable, Inject } from '@nestjs/common';
import { CatalogueService } from '../catalogue/catalogue.service';
import { DeliveryRule } from '../shared/types/delivery-rule.interface';
import { SpecialOffer } from '../shared/types/special-offer.interface';
import { Basket, BasketItem } from '../shared/types/basket.interface';

/**
 * Service for managing shopping basket operations
 */
@Injectable()
export class BasketService {
  private basket: Basket = { items: [] };

  constructor(
    private readonly catalogueService: CatalogueService,
    @Inject('DeliveryRule') private readonly deliveryRule: DeliveryRule,
    @Inject('SpecialOffer') private readonly specialOffer: SpecialOffer,
  ) {}

  /**
   * Add a product to the basket by its code
   * @param productCode The code of the product to add
   * @throws Error if product code is invalid
   */
  add(productCode: string): void {
    const product = this.catalogueService.getProduct(productCode);
    if (!product) {
      throw new Error(`Invalid product code: ${productCode}`);
    }

    const existingItem = this.basket.items.find(
      (item) => item.product.code === productCode,
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.basket.items.push({ product, quantity: 1 });
    }
  }

  /**
   * Calculate the total cost of the basket including delivery and discounts
   * @returns The final total cost
   */
  total(): number {
    // Calculate subtotal before delivery and discounts
    const subtotal = this.basket.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );

    // Apply special offers
    const discount = this.specialOffer.calculateDiscount(this.basket);

    // Calculate delivery charge based on discounted subtotal
    const deliveryCharge = this.deliveryRule.calculateDeliveryCharge(
      subtotal - discount,
    );

    // Return final total rounded to 2 decimal places
    return Number((subtotal - discount + deliveryCharge).toFixed(2));
  }

  /**
   * Clear all items from the basket
   */
  clear(): void {
    this.basket = { items: [] };
  }

  /**
   * Get the current basket contents
   * @returns The current basket
   */
  getBasket(): Basket {
    return { ...this.basket, items: [...this.basket.items] };
  }
}
