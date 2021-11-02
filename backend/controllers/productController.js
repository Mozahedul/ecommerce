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
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};
  const products = await Product.find({ ...keyword });
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

/**
 * @async
 * @function createProductReview
 * @desc create a new review
 * - Route - POST /api/products/:id/reviews
 * - Access - Private
 * @category Backend
 */

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      r => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getProduct,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
};
