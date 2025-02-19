import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../models/Product';
import { getProductById, createProduct, updateProduct } from '../services/ProductService';
import { Form, Input, InputNumber, Button, Checkbox, Card } from 'antd';

const ProductForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product>({
        name: '',
        price: 0,
        sku: '',
        stockQuantity: 0,
        available: true,
        imageUrl: ''
    });
    const [form] = Form.useForm();

    useEffect(() => {
        if (id) {
            fetchProduct(id);
        }
    }, [id]);

    const fetchProduct = async (id: string) => {
        console.log('id', id);
        const data = await getProductById(Number(id));
        console.log('data', data);
        setProduct(data);
        form.setFieldsValue(data); // Set form fields with fetched data
    };

    const handleChange = (changedValues: any) => {
        setProduct({ ...product, ...changedValues });
    };

    const handleSubmit = async () => {
        if (id) {
            await updateProduct(product);
        } else {
            await createProduct(product);
        }
        navigate('/');
    };

    return (
        <Card title={id ? 'Edit Product' : 'Create Product'} style={{ maxWidth: 600, margin: '0 auto' }}>
            <Form
                form={form}
                layout="vertical"
                initialValues={product}
                onValuesChange={handleChange}
                onFinish={handleSubmit}
            >
                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input the product name!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input the product price!' }]}>
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label="SKU" name="sku">
                    <Input />
                </Form.Item>
                <Form.Item label="Stock Quantity" name="stockQuantity">
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name="available" valuePropName="checked">
                    <Checkbox>Available</Checkbox>
                </Form.Item>
                <Form.Item label="Image URL" name="imageUrl">
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default ProductForm;
