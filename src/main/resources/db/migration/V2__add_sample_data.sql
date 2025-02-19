INSERT INTO category (name, parent_id) VALUES
    ('Electronics', NULL),
    ('Computers', 1),
    ('Laptops', 2);

INSERT INTO product (name, description, price, category_id, sku) VALUES
    ('MacBook Pro', 'Apple Laptop', 1999.99, 3, 'APPLE-MBP-001'),
    ('Dell XPS', 'Windows Laptop', 1499.99, 3, 'DELL-XPS-001');