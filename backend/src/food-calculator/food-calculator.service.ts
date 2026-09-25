import { Injectable } from '@nestjs/common';

// How many items that user want to order. eg. red 3 sets, green 2 sets.
export interface OrderItems {
    red?: number;
    green?: number;
    blue?: number;
    yellow?: number;
    pink?: number;
    purple?: number;
    orange?: number;
    [key: string]: number | undefined;
}

// User request from frontend. How much items user want to order and if user has a member card or not.
export interface CalculateOrderRequest {
    items: OrderItems;
    hasMemberCard?: boolean;
}

// User response to frontend.
export interface CalculateOrderResponse {
    subtotal: number;
    bundleDiscount: number;
    memberDiscount: number;
    total: number;
}

// Menu items and pricing
export const MENU = [
    { name: 'red', price: 50, isBundle: false },
    { name: 'green', price: 40, isBundle: true },
    { name: 'blue', price: 30, isBundle: false },
    { name: 'yellow', price: 50, isBundle: false },
    { name: 'pink', price: 80, isBundle: true },
    { name: 'purple', price: 90, isBundle: false },
    { name: 'orange', price: 120, isBundle: true },
];

@Injectable()
export class FoodCalculatorService {
    /**
     * Calculates total price for the 7 menu items and applies discounts:
     * - 5% discount for doubles (pairs) of Orange, Pink, or Green sets
     * - 10% discount on total if customer has a member card
     */
    public calculate(order: CalculateOrderRequest): CalculateOrderResponse {
        const items = order.items || {};
        const hasMemberCard = Boolean(order.hasMemberCard);

        let subtotal = 0;
        let bundleDiscount = 0;

        // Calculate subtotal and 5% bundle discount using forEach
        MENU.forEach((item) => {
            const qty = items[item.name] || 0;
            subtotal += qty * item.price;

            if (item.isBundle) {
                bundleDiscount += Math.floor(qty / 2) * (item.price * 2) * 0.05;
            }
        });

        // Subtotal after applying bundle discounts
        const priceAfterBundle = subtotal - bundleDiscount;

        // 10% discount on total if member card is present
        const memberDiscount = hasMemberCard ? priceAfterBundle * 0.1 : 0;

        const total = priceAfterBundle - memberDiscount;

        return {
            subtotal: this.round(subtotal),
            bundleDiscount: this.round(bundleDiscount),
            memberDiscount: this.round(memberDiscount),
            total: this.round(total),
        };
    }

    /**
     * Helper to round to 2 decimal places
     */
    private round(val: number): number {
        return Math.round((val + Number.EPSILON) * 100) / 100;
    }
}
