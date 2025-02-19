import React, { useEffect, useState } from 'react';
import { Product } from '../models/Product';
import { getProducts, deleteProduct, FilterParams } from '../services/ProductService';
import { Link, useNavigate } from 'react-router-dom';
import {
    Table,
    Button,
    Space,
    message,
    Layout,
    Input,
    Form,
    Card,
    InputNumber,
    Row,
    Col
} from 'antd';
import { useAuth } from '../context/AuthContext';
import {
    LogoutOutlined,
    PlusOutlined,
    SearchOutlined,
    ClearOutlined
} from '@ant-design/icons';

const { Header, Content } = Layout;

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState<FilterParams>({});
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    });
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    useEffect(() => {
        fetchProducts();
    }, [pagination.current, pagination.pageSize, filters]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await getProducts(
                pagination.current - 1,
                pagination.pageSize,
                filters
            );
            setProducts(data.content);
            setPagination({
                ...pagination,
                total: data.totalElements
            });
        } catch (error) {
            message.error('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteProduct(id);
            message.success('Product deleted successfully');
            fetchProducts();
        } catch (error) {
            message.error('Failed to delete product');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleTableChange = (pagination: any) => {
        setPagination(pagination);
    };

    const handleFilter = (values: FilterParams) => {
        setFilters(values);
        setPagination({ ...pagination, current: 1 }); // Reset to first page when filtering
    };

    const handleReset = () => {
        form.resetFields();
        setFilters({});
        setPagination({ ...pagination, current: 1 });
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
                    <Button danger onClick={() => handleDelete(record.id!)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <Layout>
            <Header style={{
                background: '#fff',
                padding: '0 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 8px #f0f1f2'
            }}>
                <h2 style={{ margin: 0 }}>Product Management</h2>
                <Space>
                    <Link to="/create">
                        <Button type="primary" icon={<PlusOutlined />}>
                            Create Product
                        </Button>
                    </Link>
                    <Button
                        onClick={handleLogout}
                        icon={<LogoutOutlined />}
                        danger
                    >
                        Logout
                    </Button>
                </Space>
            </Header>
            <Content style={{ padding: '24px' }}>
                <Card style={{ marginBottom: '24px' }}>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleFilter}
                    >
                        <Row gutter={24}>
                            <Col span={8}>
                                <Form.Item name="name" label="Product Name">
                                    <Input
                                        placeholder="Search by name"
                                        allowClear
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="minPrice" label="Min Price">
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        min={0}
                                        placeholder="Min price"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="maxPrice" label="Max Price">
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        min={0}
                                        placeholder="Max price"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} style={{ textAlign: 'right' }}>
                                <Space>
                                    <Button onClick={handleReset} icon={<ClearOutlined />}>
                                        Reset
                                    </Button>
                                    <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                                        Search
                                    </Button>
                                </Space>
                            </Col>
                        </Row>
                    </Form>
                </Card>

                <Table
                    loading={loading}
                    dataSource={products}
                    columns={columns}
                    rowKey="id"
                    pagination={{
                        ...pagination,
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} items`,
                        pageSizeOptions: ['10', '20', '50']
                    }}
                    onChange={handleTableChange}
                />
            </Content>
        </Layout>
    );
};

export default ProductList;
