-- seed_data.sql

USE ecommerce_db;

INSERT INTO products (name, location, material, size, weight, rating, stock, total_sold, tax, price, description)
VALUES
('Kaos', 'Jakarta', 'Katun', 'L', 0.2, 4.5, 100, 200, 10.00, 100000.00, 'Kaos katun nyaman'),
('Celana Jeans', 'Bandung', 'Denim', '32', 0.5, 4.7, 50, 150, 15.00, 250000.00, 'Celana jeans stylish'),
('Sepatu Sneakers', 'Surabaya', 'Kulit', '42', 0.8, 4.8, 70, 300, 20.00, 500000.00, 'Sepatu sneakers trendy');
