
"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import type { ReactNode } from "react";
import type { Product } from "@/types/product";

type CartItem = {
    product: Product;
    quantity: number;
};

type CartContextType = {
    items: CartItem[];
    ready: boolean;
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [ready, setReady] = useState(false);

    // Load saved cart from the browser.
    useEffect(() => {
        try {
            const saved = localStorage.getItem("solapurmart-cart");

            if (saved) {
                const parsed: CartItem[] = JSON.parse(saved);

                if (Array.isArray(parsed)) {
                    setItems(parsed);
                }
            }
        } catch {
            localStorage.removeItem("solapurmart-cart");
        } finally {
            setReady(true);
        }
    }, []);

    // Save cart changes.
    useEffect(() => {
        if (ready) {
            localStorage.setItem(
                "solapurmart-cart",
                JSON.stringify(items)
            );
        }
    }, [items, ready]);

    const addToCart = useCallback((product: Product) => {
        if (product.stock <= 0) return;

        setItems((current) => {
            const existing = current.find(
                (item) => item.product.id === product.id
            );

            if (existing) {
                return current.map((item) =>
                    item.product.id === product.id
                        ? {
                            ...item,
                            quantity: Math.min(
                                item.quantity + 1,
                                product.stock
                            ),
                        }
                        : item
                );
            }

            return [...current, { product, quantity: 1 }];
        });
    }, []);

    const removeFromCart = useCallback((id: number) => {
        setItems((current) =>
            current.filter((item) => item.product.id !== id)
        );
    }, []);

    const updateQuantity = useCallback(
        (id: number, quantity: number) => {
            if (quantity < 1) {
                removeFromCart(id);
                return;
            }

            setItems((current) =>
                current.map((item) =>
                    item.product.id === id
                        ? {
                            ...item,
                            quantity: Math.min(
                                quantity,
                                item.product.stock
                            ),
                        }
                        : item
                )
            );
        },
        [removeFromCart]
    );

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const totalItems = items.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const totalPrice = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                items,
                ready,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used inside CartProvider");
    }

    return context;
}
