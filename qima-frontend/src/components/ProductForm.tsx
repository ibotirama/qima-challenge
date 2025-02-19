import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../models/Product';
import { getProductById, createProduct, updateProduct } from '../services/ProductService';
import {Form, Input, InputNumber, Button, Card, Checkbox, message, Space} from 'antd';

const ProductForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    useEffect(() => {
        if (id) {
            fetchProduct(id);
        }
    }, [id, form]);

    const fetchProduct = async (id: string) => {
        try {
            const data = await getProductById(Number(id));
            form.setFieldsValue(data);
        } catch (error) {
            message.error('Failed to fetch product');
            navigate('/products');
        }
    };

    const handleSubmit = async (values: Product) => {
        try {
            if (id) {
                await updateProduct({ ...values, id: Number(id) });
                message.success('Product updated successfully');
            } else {
                await createProduct(values);
                message.success('Product created successfully');
            }
            navigate('/products');
        } catch (error) {
            message.error('Failed to save product');
        }
    };

    return (
        <Card title={id ? 'Edit Product' : 'Create Product'} style={{ maxWidth: 600, margin: '24px auto' }}>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{ available: true }}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input the product name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Please input the product price!' }]}
                >
                    <InputNumber style={{ width: '100%' }} min={0} />
                </Form.Item>
                <Form.Item label="SKU" name="sku">
                    <Input />
                </Form.Item>
                <Form.Item label="Stock Quantity" name="stockQuantity">
                    <InputNumber style={{ width: '100%' }} min={0} />
                </Form.Item>
                <Form.Item name="available" valuePropName="checked">
                    <Checkbox>Available</Checkbox>
                </Form.Item>
                <Form.Item label="Image URL" name="imageUrl">
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                        <Button onClick={() => navigate('/products')}>
                            Cancel
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default ProductForm;
