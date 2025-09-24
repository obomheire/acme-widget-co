import { Module } from '@nestjs/common';
import { CatalogueService } from './catalogue.service';

/**
 * Module for managing the product catalogue
 */
@Module({
  providers: [CatalogueService],
  exports: [CatalogueService],
})
export class CatalogueModule {}
