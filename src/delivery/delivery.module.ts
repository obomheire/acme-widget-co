import { Module } from '@nestjs/common';
import { TieredDeliveryStrategy } from './tiered-delivery.strategy';

/**
 * Module for managing delivery pricing rules
 */
@Module({
  providers: [
    {
      provide: 'DeliveryRule',
      useClass: TieredDeliveryStrategy,
    },
  ],
  exports: ['DeliveryRule'],
})
export class DeliveryModule {}
