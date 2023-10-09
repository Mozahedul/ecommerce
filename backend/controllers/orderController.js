import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

/**
 * @async
 * @function addOrderItems
 * @desc Get order by ID
 * - Route - GET https://ecommerce-backend-nine-xi.vercel.app/orders/:id
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
 * - Route - GET https://ecommerce-backend-nine-xi.vercel.app/orders/:id
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

/**
 * @async
 * @function updateOrderToPaid
 * @desc Update order to paid
 * Route - GET https://ecommerce-backend-nine-xi.vercel.app/order/:id/pay
 * Access - Private
 * @category Backend
 */

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

/**
 * @async
 * @function updateOrderToDelivered
 * @desc update order to delivered
 * - Route GET https://ecommerce-backend-nine-xi.vercel.app/orders/:id/deliver
 * - Access Private/Admin
 * @category Backend
 */

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

/**
 * @async
 * @function getMyOrders
 * @desc Get logged in user orders
 * - Route - GET https://ecommerce-backend-nine-xi.vercel.app/orders/myorders
 * - Access - Private
 * @category Backend
 */

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

/**
 * @async
 * @function getOrders
 * @desc Get all orders
 * - Route GET https://ecommerce-backend-nine-xi.vercel.app/orders
 * - Access - Private/Admin
 * @category Backend
 */
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};
