import { Module } from '@nestjs/common';
import { BasketModule } from './basket/basket.module';

/**
 * Root module of the application
 */
@Module({
  imports: [BasketModule],
})
export class AppModule {}
