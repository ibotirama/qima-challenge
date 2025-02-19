import axios from 'axios';
import { Product, PaginatedProducts } from '../models/Product';

const apiUrl = 'http://localhost:8080/api/v1/products';

export const getProducts = async (page: number = 0, size: number = 20): Promise<PaginatedProducts> => {
    const response = await axios.get(apiUrl, {
        params: {
            page,
            size,
        },
    });
    return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data;
};

export const createProduct = async (product: Product): Promise<Product> => {
    const response = await axios.post(apiUrl, product);
    return response.data;
};

export const updateProduct = async (product: Product): Promise<Product> => {
    const response = await axios.put(`${apiUrl}/${product.id}`, product);
    return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
    await axios.delete(`${apiUrl}/${id}`);
};
