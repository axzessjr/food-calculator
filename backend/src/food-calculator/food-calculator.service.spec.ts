import { FoodCalculatorService } from './food-calculator.service';

describe('FoodCalculatorService', () => {
    let service: FoodCalculatorService;

    beforeEach(() => {
        service = new FoodCalculatorService();
    });

    it('Desk#1 Example: Red set + Green set is 90 THB; with member card is 81 THB', () => {
        // Without member card
        const result1 = service.calculate({
            items: { red: 1, green: 1 },
            hasMemberCard: false,
        });
        expect(result1.subtotal).toBe(90);
        expect(result1.bundleDiscount).toBe(0);
        expect(result1.total).toBe(90);

        // With member card (10% discount)
        const result2 = service.calculate({
            items: { red: 1, green: 1 },
            hasMemberCard: true,
        });
        expect(result2.subtotal).toBe(90);
        expect(result2.memberDiscount).toBe(9);
        expect(result2.total).toBe(81);
    });

    it('Orange sets Example: 5 items get 5% discount for 4 items (2 pairs)', () => {
        // 5 items @ 120 = 600
        // 4 items (2 pairs) get 5% discount: 4 * 120 * 0.05 = 24 THB discount
        // Total = 600 - 24 = 576 THB
        const result = service.calculate({
            items: { orange: 5 },
            hasMemberCard: false,
        });
        expect(result.subtotal).toBe(600);
        expect(result.bundleDiscount).toBe(24);
        expect(result.total).toBe(576);

        // With member card: 576 - 10% (57.6) = 518.4 THB
        const resultWithMember = service.calculate({
            items: { orange: 5 },
            hasMemberCard: true,
        });
        expect(resultWithMember.memberDiscount).toBe(57.6);
        expect(resultWithMember.total).toBe(518.4);
    });

    it('should give 5% bundle discount for pairs of Green and Pink sets', () => {
        // 2 Green sets @ 40 = 80 - (80 * 0.05) = 76 THB
        const greenResult = service.calculate({ items: { green: 2 } });
        expect(greenResult.bundleDiscount).toBe(4);
        expect(greenResult.total).toBe(76);

        // 2 Pink sets @ 80 = 160 - (160 * 0.05) = 152 THB
        const pinkResult = service.calculate({ items: { pink: 2 } });
        expect(pinkResult.bundleDiscount).toBe(8);
        expect(pinkResult.total).toBe(152);
    });

    it('should NOT give bundle discount to non-eligible sets (Red, Blue, Yellow, Purple)', () => {
        const result = service.calculate({
            items: { red: 2, blue: 2, yellow: 2, purple: 2 },
        });
        expect(result.bundleDiscount).toBe(0);
        // (2*50) + (2*30) + (2*50) + (2*90) = 100 + 60 + 100 + 180 = 440
        expect(result.total).toBe(440);
    });

    it('should return 0 when order is empty', () => {
        const result = service.calculate({ items: {} });
        expect(result.total).toBe(0);
    });
});
