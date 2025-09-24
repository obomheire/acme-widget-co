import { Test, TestingModule } from '@nestjs/testing';
import { BasketService } from './basket.service';
import { CatalogueService } from '../catalogue/catalogue.service';
import { TieredDeliveryStrategy } from '../delivery/tiered-delivery.strategy';
import { RedWidgetOfferStrategy } from '../offers/red-widget-offer.strategy';

describe('BasketService', () => {
  let service: BasketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BasketService,
        CatalogueService,
        {
          provide: 'DeliveryRule',
          useClass: TieredDeliveryStrategy,
        },
        {
          provide: 'SpecialOffer',
          useClass: RedWidgetOfferStrategy,
        },
      ],
    }).compile();

    service = module.get<BasketService>(BasketService);
  });

  afterEach(() => {
    service.clear();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('example baskets from assignment', () => {
    it('should calculate correct total for B01, G01 = $37.85', () => {
      service.add('B01');
      service.add('G01');
      expect(service.total()).toBe(37.85);
    });

    it('should calculate correct total for R01, R01 = $54.37', () => {
      service.add('R01');
      service.add('R01');
      expect(service.total()).toBe(54.37);
    });

    it('should calculate correct total for R01, G01 = $60.85', () => {
      service.add('R01');
      service.add('G01');
      expect(service.total()).toBe(60.85);
    });

    it('should calculate correct total for B01, B01, R01, R01, R01 = $98.27', () => {
      service.add('B01');
      service.add('B01');
      service.add('R01');
      service.add('R01');
      service.add('R01');
      expect(service.total()).toBe(98.27);
    });
  });

  describe('delivery rules', () => {
    it('should charge $4.95 for orders under $50', () => {
      service.add('B01'); // $7.95
      expect(service.total()).toBe(12.9); // $7.95 + $4.95 delivery
    });

    it('should charge $2.95 for orders between $50 and $90', () => {
      service.add('R01'); // $32.95
      service.add('G01'); // $24.95 (total $57.90)
      expect(service.total()).toBe(60.85); // $57.90 + $2.95 delivery
    });

    it('should have free delivery for orders of $90 or more', () => {
      service.add('R01'); // $32.95
      service.add('R01'); // $32.95
      service.add('R01'); // $32.95
      // Subtotal: $98.85 - $16.475 (half price second R01) = $82.375
      expect(service.total()).toBe(98.27);
    });
  });

  describe('red widget special offer', () => {
    it('should apply half price discount to second red widget', () => {
      service.add('R01'); // $32.95
      service.add('R01'); // $32.95 / 2 = $16.475
      // Subtotal: $49.425 + $4.95 delivery = $54.37
      expect(service.total()).toBe(54.37);
    });

    it('should apply discount to multiple pairs of red widgets', () => {
      service.add('R01');
      service.add('R01'); // First pair: $32.95 + $16.475
      service.add('R01');
      service.add('R01'); // Second pair: $32.95 + $16.475
      // Subtotal: $98.85 - $32.95 = $65.90 + $2.95 delivery = $68.85
      expect(service.total()).toBe(68.85);
    });
  });

  describe('error handling', () => {
    it('should throw error for invalid product code', () => {
      expect(() => service.add('INVALID')).toThrow(
        'Invalid product code: INVALID',
      );
    });
  });
});
