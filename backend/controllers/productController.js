import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

/**
 * @async
 * @function callback function
 * @desc Fetching all products from database
 * - Route - GET /api/products
 * - access - Public
 * @category Backend
 */
const getProduct = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

/**
 * @async
 * @function callback function
 * @desc Fetching single product from database
 * - Route - GET /api/products/:id
 * - access - Public
 * @category Backend
 */
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product Not Found');
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

/**
 * @async
 * @function createProduct
 * @desc create a product
 * - Route POST /api/products
 * - Access Private/Admin
 * @category Backend
 */

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'sample product',
    price: 0,
    user: req.user._id,
    description: 'sample description',
    countInStock: 0,
    rating: 4,
    brand: 'apple',
    numReviews: 3,
    image: '/image/sample.jpg',
    category: 'electronics',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

/**
 * @async
 * @function updateProduct
 * @desc Update a product
 * - Route POST /api/products/:id
 * - Access Private/Admin
 * @category Backend
 */

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    countInStock,
    rating,
    brand,
    numReviews,
    image,
    category,
  } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.countInStock = countInStock || product.countInStock;
    product.rating = rating || product.rating;
    product.brand = brand || product.brand;
    product.numReviews = numReviews || product.numReviews;
    product.image = image || product.image;
    product.category = category || product.category;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error();
  }
});

export {
  getProduct,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
