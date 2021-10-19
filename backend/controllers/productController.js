import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

/**
 * @async
 * @function callback function
 * @desc Fetching all products from database
 * - Route - GET /api/products
 * - access - Public
 * @param {Object} req - request object to get data from server
 * @param {Object} res - response object to send data to server
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
 * @param {Object} req - request object to get data from server
 * @param {Object} res - response object to send data to server
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

export { getProduct, getProductById };