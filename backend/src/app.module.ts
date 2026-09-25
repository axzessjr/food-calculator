import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodCalculatorModule } from './food-calculator/food-calculator.module';

@Module({
    imports: [FoodCalculatorModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
