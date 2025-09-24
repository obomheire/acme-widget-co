import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { BasketService } from '../src/basket/basket.service';

describe('Acme Widget Co Application (e2e)', () => {
  let app: INestApplication;
  let basketService: BasketService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    basketService = moduleFixture.get<BasketService>(BasketService);
    await app.init();
  });

  afterEach(() => {
    basketService.clear();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Basket Integration Tests', () => {
    it('should calculate correct total for assignment example: B01, G01 = $37.85', () => {
      basketService.add('B01');
      basketService.add('G01');
      expect(basketService.total()).toBe(37.85);
    });

    it('should calculate correct total for assignment example: R01, R01 = $54.37', () => {
      basketService.add('R01');
      basketService.add('R01');
      expect(basketService.total()).toBe(54.37);
    });

    it('should calculate correct total for assignment example: R01, G01 = $60.85', () => {
      basketService.add('R01');
      basketService.add('G01');
      expect(basketService.total()).toBe(60.85);
    });

    it('should calculate correct total for assignment example: B01, B01, R01, R01, R01 = $98.27', () => {
      basketService.add('B01');
      basketService.add('B01');
      basketService.add('R01');
      basketService.add('R01');
      basketService.add('R01');
      expect(basketService.total()).toBe(98.27);
    });

    it('should handle invalid product codes gracefully', () => {
      expect(() => basketService.add('INVALID')).toThrow(
        'Invalid product code: INVALID',
      );
    });
  });
});
