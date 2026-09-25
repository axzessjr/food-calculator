import { Body, Controller, Post } from '@nestjs/common';
import { FoodCalculatorService } from './food-calculator.service';
import type {
    CalculateOrderRequest,
    CalculateOrderResponse,
} from './food-calculator.service';

// An endpoint to calculate the total price of the order.
@Controller('food-calculator')
export class FoodCalculatorController {
    constructor(private readonly foodCalculatorService: FoodCalculatorService) { }

    // POST: /food-calculator/calculate
    @Post('calculate')
    public calculate(@Body() body: CalculateOrderRequest): CalculateOrderResponse {
        return this.foodCalculatorService.calculate(body);
    }
}
