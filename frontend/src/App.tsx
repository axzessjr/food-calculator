import { useState } from 'react';
import './App.css';

type ItemKey =
    'red' | 'green' | 'blue' | 'yellow' | 'pink' | 'purple' | 'orange';

interface MenuItem {
    id: ItemKey;
    name: string;
    price: number;
    bundleEligible: boolean;
}

const MENU: MenuItem[] = [
    { id: 'red', name: 'Red set', price: 50, bundleEligible: false },
    { id: 'green', name: 'Green set', price: 40, bundleEligible: true },
    { id: 'blue', name: 'Blue set', price: 30, bundleEligible: false },
    { id: 'yellow', name: 'Yellow set', price: 50, bundleEligible: false },
    { id: 'pink', name: 'Pink set', price: 80, bundleEligible: true },
    { id: 'purple', name: 'Purple set', price: 90, bundleEligible: false },
    { id: 'orange', name: 'Orange set', price: 120, bundleEligible: true },
];

interface CalculationResult {
    subtotal: number;
    bundleDiscount: number;
    memberDiscount: number;
    total: number;
}

export function App() {
    const [quantities, setQuantities] = useState<Record<ItemKey, number>>({
        red: 0,
        green: 0,
        blue: 0,
        yellow: 0,
        pink: 0,
        purple: 0,
        orange: 0,
    });
    const [hasMemberCard, setHasMemberCard] = useState<boolean>(false);
    const [result, setResult] = useState<CalculationResult | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const updateQuantity = (id: ItemKey, val: number) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max(0, val),
        }));
    };

    const handleCalculate = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(
                'http://localhost:3000/food-calculator/calculate',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        items: quantities,
                        hasMemberCard,
                    }),
                },
            );

            if (!res.ok) {
                throw new Error('Failed to calculate price from server');
            }

            const data: CalculationResult = await res.json();
            setResult(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Calculation error');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setQuantities({
            red: 0,
            green: 0,
            blue: 0,
            yellow: 0,
            pink: 0,
            purple: 0,
            orange: 0,
        });
        setHasMemberCard(false);
        setResult(null);
        setError(null);
    };

    // Quick test helpers matching homework examples
    const loadDesk1Example = () => {
        setQuantities({
            red: 1,
            green: 1,
            blue: 0,
            yellow: 0,
            pink: 0,
            purple: 0,
            orange: 0,
        });
        setHasMemberCard(true);
        setResult(null);
    };

    const loadOrange5Example = () => {
        setQuantities({
            red: 0,
            green: 0,
            blue: 0,
            yellow: 0,
            pink: 0,
            purple: 0,
            orange: 5,
        });
        setHasMemberCard(false);
        setResult(null);
    };

    return (
        <div className="container">
            <header className="header">
                <h1>Food Store Calculator</h1>
                <p>
                    Select quantities for menu items and calculate total price
                </p>
                <div className="example-buttons">
                    <button type="button" onClick={loadDesk1Example}>
                        Load Example: Desk #1 (Red + Green + Card)
                    </button>
                    <button type="button" onClick={loadOrange5Example}>
                        Load Example: 5 Orange Sets
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="reset-btn"
                    >
                        Reset
                    </button>
                </div>
            </header>

            <div className="main-layout">
                {/* Menu list */}
                <div className="menu-list">
                    <h2>Menu Items</h2>
                    {MENU.map((item) => {
                        const qty = quantities[item.id];
                        return (
                            <div key={item.id} className="menu-item-row">
                                <div className="item-info">
                                    <span className="item-name">
                                        {item.name}
                                    </span>
                                    <span className="item-price">
                                        {item.price} THB/set
                                    </span>
                                    {item.bundleEligible && (
                                        <span className="bundle-tag">
                                            5% off pairs
                                        </span>
                                    )}
                                </div>
                                <div className="qty-controls">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            updateQuantity(item.id, qty - 1)
                                        }
                                        disabled={qty <= 0}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        min="0"
                                        value={qty}
                                        onChange={(e) =>
                                            updateQuantity(
                                                item.id,
                                                parseInt(e.target.value, 10) ||
                                                    0,
                                            )
                                        }
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            updateQuantity(item.id, qty + 1)
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                    <div className="member-card-option">
                        <label>
                            <input
                                type="checkbox"
                                checked={hasMemberCard}
                                onChange={(e) =>
                                    setHasMemberCard(e.target.checked)
                                }
                            />
                            Customer has Member Card (10% discount on Total)
                        </label>
                    </div>

                    <button
                        type="button"
                        className="calculate-btn"
                        onClick={handleCalculate}
                        disabled={loading}
                    >
                        {loading ? 'Calculating...' : 'Calculate Price'}
                    </button>
                </div>

                {/* Calculation Summary */}
                <div className="summary-panel">
                    <h2>Calculation Result</h2>
                    {error && <div className="error-box">{error}</div>}

                    {result ? (
                        <div className="result-details">
                            <div className="result-row">
                                <span>Subtotal:</span>
                                <strong>
                                    {result.subtotal.toFixed(2)} THB
                                </strong>
                            </div>

                            {result.bundleDiscount > 0 && (
                                <div className="result-row discount">
                                    <span>5% Bundle Discount (Doubles):</span>
                                    <strong>
                                        -{result.bundleDiscount.toFixed(2)} THB
                                    </strong>
                                </div>
                            )}

                            {result.memberDiscount > 0 && (
                                <div className="result-row discount">
                                    <span>10% Member Card Discount:</span>
                                    <strong>
                                        -{result.memberDiscount.toFixed(2)} THB
                                    </strong>
                                </div>
                            )}

                            <hr />

                            <div className="result-row total">
                                <span>Total Price:</span>
                                <strong>{result.total.toFixed(2)} THB</strong>
                            </div>
                        </div>
                    ) : (
                        <p className="no-result">
                            Click "Calculate Price" to see the breakdown.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
