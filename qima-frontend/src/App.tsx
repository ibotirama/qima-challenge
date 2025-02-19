import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

const App: React.FC = () => {
  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/create" element={<ProductForm />} />
            <Route path="/edit/:id" element={<ProductForm />} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;
