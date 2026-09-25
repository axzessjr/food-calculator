import { FoodCalculatorController } from './food-calculator.controller';
import { FoodCalculatorService } from './food-calculator.service';

describe('FoodCalculatorController', () => {
    let controller: FoodCalculatorController;
    let service: FoodCalculatorService;

    beforeEach(() => {
        service = new FoodCalculatorService();
        controller = new FoodCalculatorController(service);
    });

    it('should calculate price via controller', () => {
        const response = controller.calculate({
            items: { red: 1, green: 1 },
            hasMemberCard: true,
        });
        expect(response.total).toBe(81);
    });
});
