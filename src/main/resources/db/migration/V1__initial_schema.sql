-- V1__initial_schema.sql
CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    parent_id INTEGER,
    full_path TEXT,
    FOREIGN KEY (parent_id) REFERENCES category(id)
);

CREATE TABLE product (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     description TEXT,
     price DECIMAL(10, 2) NOT NULL,
     category_id INTEGER,
     available BOOLEAN DEFAULT TRUE,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     sku VARCHAR(50) UNIQUE,
     image_url VARCHAR(255),
     stock_quantity INTEGER,
     FOREIGN KEY (category_id) REFERENCES category(id)
);