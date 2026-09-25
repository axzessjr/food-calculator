import { Module } from '@nestjs/common';
import { FoodCalculatorService } from './food-calculator.service';
import { FoodCalculatorController } from './food-calculator.controller';

@Module({
    controllers: [FoodCalculatorController],
    providers: [FoodCalculatorService],
    exports: [FoodCalculatorService],
})
export class FoodCalculatorModule {}
