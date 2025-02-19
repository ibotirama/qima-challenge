import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/products"
                            element={
                                <ProtectedRoute>
                                    <ProductList />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/create"
                            element={
                                <ProtectedRoute>
                                    <ProductForm />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/edit/:id"
                            element={
                                <ProtectedRoute>
                                    <ProductForm />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/" element={<Navigate to="/login" />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
