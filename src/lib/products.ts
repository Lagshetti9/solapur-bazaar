
import type { Product, ProductListResponse } from "@/types/product";

const API = "https://dummyjson.com";

export async function getProducts(): Promise<Product[]> {
    const response = await fetch(`${API}/products?limit=24`, {
        next: { revalidate: 300 },
    });

    if (!response.ok) {
        throw new Error("Failed to load products");
    }

    const data: ProductListResponse = await response.json();

    return data.products;
}

export async function getProduct(
    id: string
): Promise<Product | null> {
    const response = await fetch(`${API}/products/${id}`, {
        next: { revalidate: 300 },
    });

    if (!response.ok) {
        return null;
    }

    const data: Product = await response.json();

    return data;
}

export async function getCategories(): Promise<string[]> {
    const response = await fetch(`${API}/products/category-list`, {
        next: { revalidate: 3600 },
    });

    if (!response.ok) {
        return [];
    }

    const data: string[] = await response.json();

    return data;
}
