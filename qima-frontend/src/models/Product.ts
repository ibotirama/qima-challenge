export interface Category {
    id: number;
    name: string;
}

export interface Product {
    id?: number;
    name: string;
    description?: string;
    price: number;
    category?: Category;
    sku?: string;
    stockQuantity?: number;
    available?: boolean;
    imageUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface PaginatedProducts {
    content: Product[];
    pageable: {
        pageNumber: number;
        pageSize: number;
        offset: number;
        paged: boolean;
        unpaged: boolean;
    };
    totalPages: number;
    totalElements: number;
    last: boolean;
    first: boolean;
    size: number;
    number: number;
    sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
    };
    numberOfElements: number;
    empty: boolean;
}
