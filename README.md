# Acme Widget Co - Basket System

A NestJS implementation of the Acme Widget Co basket system, demonstrating clean architecture and separation of concerns using TypeScript.

## Features

- Product catalogue management
- Shopping basket with add and total functionality
- Tiered delivery pricing rules
- Special offers system (currently implementing "buy one red widget, get the second half price")
- Comprehensive test coverage including all example scenarios

## Project Structure

```
src/
├── basket/           # Basket module and service
├── catalogue/        # Product catalogue module and service
├── delivery/         # Delivery pricing rules
├── offers/          # Special offers implementation
└── shared/          # Shared interfaces and types
```

## Design Decisions

1. **Modular Architecture**: Used NestJS modules to separate concerns and maintain clean dependencies.
2. **Strategy Pattern**: Implemented delivery rules and special offers using the Strategy pattern for flexibility and extensibility.
3. **Dependency Injection**: Leveraged NestJS's DI system for loose coupling between components.
4. **Type Safety**: Comprehensive TypeScript interfaces for all domain objects.

## Prerequisites

- Node.js (v18 or later)
- npm (v9 or later)

## Installation

```bash
npm install
```

## Running the Application

```bash
# Development mode
npm run start

# Watch mode
npm run start:dev

# Production mode
npm run start:prod
```

## Running Tests

```bash
# Unit tests
npm run test

# Test coverage
npm run test:cov

# E2E tests
npm run test:e2e
```

## Example Usage

```typescript
// Initialize the basket service through NestJS DI system
const basket = app.get(BasketService);

// Add items
basket.add('R01'); // Red Widget
basket.add('G01'); // Green Widget

// Get total (includes delivery and any applicable discounts)
const total = basket.total();
```

## Assumptions

1. Product codes are case-sensitive and must match exactly (R01, G01, B01).
2. Prices and delivery charges are in the same currency unit.
3. All monetary calculations are rounded to 2 decimal places.
4. The red widget offer applies to pairs of red widgets in the order they were added.
5. Delivery charges are calculated after discounts are applied.

## Future Improvements

1. Add persistence layer for baskets
2. Implement more special offers
3. Add API endpoints for basket operations
4. Add validation for edge cases (max quantities, etc.)
5. Add logging and monitoring

## License

MIT
