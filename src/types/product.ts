
export type ProductReview = {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
};

export type ProductDimensions = {
    width: number;
    height: number;
    depth: number;
};

export type ProductMeta = {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
};

export type Product = {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;

    brand?: string;
    sku?: string;
    weight?: number;
    minimumOrderQuantity?: number;

    thumbnail: string;
    images: string[];

    tags?: string[];
    availabilityStatus?: string;
    returnPolicy?: string;
    warrantyInformation?: string;
    shippingInformation?: string;

    dimensions?: ProductDimensions;
    reviews?: ProductReview[];
    meta?: ProductMeta;
};

export type ProductListResponse = {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
};
