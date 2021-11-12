import path from 'path';
import colors from 'colors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// For PayPal payment Gateway
app.use('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// For Stripe payment gateway
app.use('/api/config/stripe', (req, res) => {
  const { product, token } = req.body;
  console.log('Product', product);
  console.log('Price', product.price);
  const itemPotencyKey = uuidv4();

  /* 
Here,
1. stripe is an API which provides an interface to create a customer
2. customers is an object that incudes inside the stripe API 
3. this customers object has a method named create() which is used to 
    a new customer
*/
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then(customer => {
      /* 
      Here, 
      1. amount, currency, and customer are essential
      2. receipt_email, description, and shipping are optional
      */
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: 'usd',
          customer: customer.id,
          receipt_email: token.email,
          description: `Purchase of ${product.name}`,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        { itemPotencyKey }
      );
    })
    .then(result => res.status(200).json(result))
    .catch(error => console.log(error));
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    colors.green.bold.underline(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  );
});
