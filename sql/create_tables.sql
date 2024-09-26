-- create_tables.sql

CREATE DATABASE IF NOT EXISTS ecommerce_db;

USE ecommerce_db;

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  material VARCHAR(255),
  size VARCHAR(50),
  weight DECIMAL(10,2),
  rating DECIMAL(2,1),
  stock INT,
  total_sold INT,
  tax DECIMAL(5,2),
  price DECIMAL(10,2) NOT NULL,
  description TEXT
);
