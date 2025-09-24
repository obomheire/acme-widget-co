import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { CatalogueModule } from '../catalogue/catalogue.module';
import { DeliveryModule } from '../delivery/delivery.module';
import { OffersModule } from '../offers/offers.module';

/**
 * Module for managing shopping basket functionality
 */
@Module({
  imports: [CatalogueModule, DeliveryModule, OffersModule],
  providers: [BasketService],
  exports: [BasketService],
})
export class BasketModule {}
