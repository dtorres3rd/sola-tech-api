const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

const app = express();
const { PORT, MAINTENANCE_MODE } = keys;

/* TODO: Set a maintenance mode in environment var to act as a toggle for maintenance mode */
if (MAINTENANCE_MODE === 'true') {
  app.use((req, res) => {
    // console.log(req.method, req.path)
    res.status(503).send('Site is in maintenance mode, Check back soon.');
  });
}

// require('dotenv').config();
require('./db/connectDB');

app.get('/healthcheck', (req, res) => {
  res.send({ status: 'ok' });
});

// import routes
const userRoutes = require('./routes/users');
const categoryRoutes = require('./routes/category');
const productsRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/category', express.static(__dirname + '/upload/category'));
app.use('/profile', express.static(__dirname + '/upload/profiles'));
app.use('/products', express.static(__dirname + '/upload/products'));

// adding routes
app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
