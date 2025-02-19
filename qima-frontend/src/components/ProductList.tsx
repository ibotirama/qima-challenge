import React, { useEffect, useState } from 'react';
import { Product, PaginatedProducts } from '../models/Product';
import { getProducts, deleteProduct } from '../services/ProductService';
import { Link } from 'react-router-dom';
import { Table, Button, Space, Pagination } from 'antd';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 20,
        total: 0,
    });

    useEffect(() => {
        fetchProducts(pagination.current - 1, pagination.pageSize);
    }, [pagination.current, pagination.pageSize]);

    const fetchProducts = async (page: number, size: number) => {
        const data: PaginatedProducts = await getProducts(page, size);
        setProducts(data.content);
        setPagination({
            current: data.pageable.pageNumber + 1,
            pageSize: data.pageable.pageSize,
            total: data.totalElements,
        });
    };

    const handleDelete = async (id: number) => {
        await deleteProduct(id);
        fetchProducts(pagination.current - 1, pagination.pageSize);
    };

    const handleTableChange = (page: number, pageSize?: number) => {
        setPagination({
            ...pagination,
            current: page,
            pageSize: pageSize || pagination.pageSize,
        });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => `$${price.toFixed(2)}`,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Product) => (
                <Space size="middle">
                    <Link to={`/edit/${record.id}`}>
                        <Button type="primary">Edit</Button>
                    </Link>
                    <Button danger={true} onClick={() => handleDelete(record.id!)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <h2>Product List</h2>
            <Link to="/create">
                <Button type="primary" style={{ marginBottom: 16 }}>
                    Create New Product
                </Button>
            </Link>
            <Table
                dataSource={products}
                columns={columns}
                rowKey="id"
                pagination={false}
            />
            <Pagination
                current={pagination.current}
                pageSize={pagination.pageSize}
                total={pagination.total}
                onChange={handleTableChange}
                style={{ marginTop: 16, textAlign: 'right' }}
            />
        </div>
    );
};

export default ProductList;
