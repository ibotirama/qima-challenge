import { Product, PaginatedProducts } from '../models/Product';
import axiosInstance from './AxiosConfig';

export const getProducts = async (page: number = 0, size: number = 20): Promise<PaginatedProducts> => {
    const response = await axiosInstance.get('/products', {
        params: { page, size }
    });
    return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
};

export const createProduct = async (product: Product): Promise<Product> => {
    const response = await axiosInstance.post('/products', product);
    return response.data;
};

export const updateProduct = async (product: Product): Promise<Product> => {
    const response = await axiosInstance.put(`/products/${product.id}`, product);
    return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
    await axiosInstance.delete(`/products/${id}`);
};
