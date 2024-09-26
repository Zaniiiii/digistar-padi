// index.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Swagger Setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce Product API',
      version: '1.0.0',
      description: 'API documentation for the E-commerce Product API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      schemas: {
        Product: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            name: {
              type: 'string',
            },
            location: {
              type: 'string',
            },
            material: {
              type: 'string',
            },
            size: {
              type: 'string',
            },
            weight: {
              type: 'number',
            },
            rating: {
              type: 'number',
            },
            stock: {
              type: 'integer',
            },
            total_sold: {
              type: 'integer',
            },
            tax: {
              type: 'number',
            },
            price: {
              type: 'number',
            },
            description: {
              type: 'string',
            },
          },
        },
        ProductInput: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
            location: {
              type: 'string',
            },
            material: {
              type: 'string',
            },
            size: {
              type: 'string',
            },
            weight: {
              type: 'number',
            },
            rating: {
              type: 'number',
            },
            stock: {
              type: 'integer',
            },
            total_sold: {
              type: 'integer',
            },
            tax: {
              type: 'number',
            },
            price: {
              type: 'number',
            },
            description: {
              type: 'string',
            },
          },
          required: ['name', 'price'],
        },
      },
    },
  },
  apis: ['./index.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Root Route
app.get('/', (req, res) => {
  res.send('Selamat datang di E-commerce Product API');
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Membuat produk baru
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: Produk berhasil dibuat
 *       400:
 *         description: Bad request
 */
app.post('/products', async (req, res) => {
    const {
      name,
      location,
      material,
      size,
      weight,
      rating,
      stock,
      total_sold,
      tax,
      price,
      description,
    } = req.body;
  
    const sql = `INSERT INTO products (name, location, material, size, weight, rating, stock, total_sold, tax, price, description)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
    try {
      // Destructuring hasil query
      const [results] = await pool.execute(sql, [
        name,
        location,
        material,
        size,
        weight,
        rating,
        stock,
        total_sold,
        tax,
        price,
        description,
      ]);
      
      res.status(201).send({ id: results.insertId, ...req.body });
    } catch (err) {
      console.error(err);
      res.status(500).send('Terjadi kesalahan saat membuat produk');
    }
  });

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Mendapatkan semua produk
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Daftar produk
 */
// GET semua produk
app.get('/products', async (req, res) => {
    try {
      // Destructuring hasil query
      const [results] = await pool.execute('SELECT * FROM products');
      res.send(results); // Mengembalikan array produk
    } catch (err) {
      console.error(err);
      res.status(500).send('Terjadi kesalahan saat mengambil produk');
    }
  });

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Mendapatkan produk berdasarkan ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID produk yang ingin diambil
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Data produk
 *       404:
 *         description: Produk tidak ditemukan
 */
app.get('/products/:id', async (req, res) => {
    const sql = 'SELECT * FROM products WHERE id = ?';
    try {
      const [results] = await pool.execute(sql, [req.params.id]);
      if (results.length === 0) {
        return res.status(404).send('Produk tidak ditemukan');
      }
      res.send(results[0]); // Mengembalikan produk dengan ID tersebut
    } catch (err) {
      console.error(err);
      res.status(500).send('Terjadi kesalahan saat mengambil produk');
    }
  });

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Mengupdate produk
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID produk yang ingin diupdate
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: Produk berhasil diupdate
 *       404:
 *         description: Produk tidak ditemukan
 */
app.put('/products/:id', async (req, res) => {
    const {
      name,
      location,
      material,
      size,
      weight,
      rating,
      stock,
      total_sold,
      tax,
      price,
      description,
    } = req.body;
  
    const sql = `UPDATE products SET name = ?, location = ?, material = ?, size = ?, weight = ?, rating = ?, stock = ?, total_sold = ?, tax = ?, price = ?, description = ? WHERE id = ?`;
  
    try {
      const [results] = await pool.execute(sql, [
        name,
        location,
        material,
        size,
        weight,
        rating,
        stock,
        total_sold,
        tax,
        price,
        description,
        req.params.id,
      ]);
  
      if (results.affectedRows === 0) {
        return res.status(404).send('Produk tidak ditemukan');
      }
      res.send({ id: parseInt(req.params.id), ...req.body });
    } catch (err) {
      console.error(err);
      res.status(500).send('Terjadi kesalahan saat mengupdate produk');
    }
  });

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Menghapus produk
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID produk yang ingin dihapus
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produk berhasil dihapus
 *       404:
 *         description: Produk tidak ditemukan
 */
app.delete('/products/:id', async (req, res) => {
    const sql = 'DELETE FROM products WHERE id = ?';
    try {
      const [results] = await pool.execute(sql, [req.params.id]);
      if (results.affectedRows === 0) {
        return res.status(404).send('Produk tidak ditemukan');
      }
      res.send({ message: 'Produk berhasil dihapus' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Terjadi kesalahan saat menghapus produk');
    }
  });

// Menjalankan Server
app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
