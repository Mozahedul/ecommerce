import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

/**
 * @async
 * @function addOrderItems
 * @desc Get order by ID
 * - Route - GET /api/orders/:id
 * - Access - Private
 * @category Backend
 */

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
    // eslint-disable-next-line no-unreachable
    return;
  }
  const order = new Order({
    orderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();

  res.status(201).json(createdOrder);
});

/**
 * @async
 * @function addOrderItems
 * @desc Get order by ID
 * - Route - GET /api/orders/:id
 * - Access - Private
 * @category Backend
 */

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', [
    'name',
    'email',
  ]);

  console.log(order);
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

export { addOrderItems, getOrderById };
