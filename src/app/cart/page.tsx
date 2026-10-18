import type { Metadata } from "next";
import ShoppingCart from "@/components/ShoppingCart";

export const metadata: Metadata = {
    title: "Shopping Cart",
    description: "Review your SolapurMart shopping cart.",
};

export default function CartPage() {
    return (
        <main className="min-h-[60vh] bg-gray-50">
            <ShoppingCart />
        </main>
    );
}