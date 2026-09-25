# Food Calculator App

A simple food store calculator application for calculating order totals with bundle discounts and member card discounts.

## Tech Stacks
- Backend: Node.js + NestJS (TypeScript)
- Frontend: Vite + React (TypeScript)
- Testing: Jest

## Key Files to Review
- Business Logic: backend/src/food-calculator/food-calculator.service.ts
  (Core calculator logic, menu prices, bundle & member discounts)
- API Controller: backend/src/food-calculator/food-calculator.controller.ts
  (Receives POST request from frontend)
- Unit Tests: backend/src/food-calculator/food-calculator.service.spec.ts
  (Unit tests verifying homework test cases)
- Frontend UI: frontend/src/App.tsx
  (User interface with item quantities, member card checkbox, and test buttons)

## Screenshots
Please see the attached screenshot files in the root folder:
- app-example-1.jpg
- app-example-2.jpg
- app-example-3.jpg

## How to Set Up & Run

1. Backend:
====================
cd backend
npm install
npm run start:dev
====================

The backend will run at http://localhost:3000.

2. Frontend:
====================
cd frontend
npm install
npm run dev
====================

The frontend will run at http://localhost:5173.

## How to Run Unit Tests

In the backend directory:
====================
cd backend
npm test
====================

Verified Test Cases:
- Desk #1 Example: Red set (50 THB) + Green set (40 THB) = 90 THB. With member card: 90 - 10% = 81 THB.
- Orange sets Example: 5 Orange sets (120 THB each = 600 THB). 4 items (2 pairs) get 5% discount (24 THB) = 576 THB (with member card: 518.40 THB).
- Bundle Discounts: Pairs of Green (40 THB) and Pink (80 THB) get 5% off per pair.
- Non-eligible sets: Red, Blue, Yellow, and Purple do not receive bundle discounts.
- Empty Order: Returns 0 THB.

## Discount Rules Summary

Menu Items (7 items):
- Red: 50 THB/set
- Green: 40 THB/set (5% discount for doubles)
- Blue: 30 THB/set
- Yellow: 50 THB/set
- Pink: 80 THB/set (5% discount for doubles)
- Purple: 90 THB/set
- Orange: 120 THB/set (5% discount for doubles)

Conditions:
- Bundle Discount: Order doubles of Orange, Pink, or Green sets get a 5% discount for each pair.
- Member Card: 10% discount on Total if customer has a member card.
