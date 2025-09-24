import { Module } from '@nestjs/common';
import { RedWidgetOfferStrategy } from './red-widget-offer.strategy';

/**
 * Module for managing special offers
 */
@Module({
  providers: [
    {
      provide: 'SpecialOffer',
      useClass: RedWidgetOfferStrategy,
    },
  ],
  exports: ['SpecialOffer'],
})
export class OffersModule {}
