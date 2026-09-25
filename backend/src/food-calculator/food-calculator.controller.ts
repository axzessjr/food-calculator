import { Body, Controller, Post } from '@nestjs/common';
import { FoodCalculatorService } from './food-calculator.service';
import type {
    CalculateOrderRequest,
    CalculateOrderResponse,
} from './food-calculator.service';

@Controller('food-calculator')
export class FoodCalculatorController {
    constructor(private readonly foodCalculatorService: FoodCalculatorService) {}

    @Post('calculate')
    public calculate(@Body() body: CalculateOrderRequest): CalculateOrderResponse {
        return this.foodCalculatorService.calculate(body);
    }
}
