import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Product } from "../models/product.model.js";
import { Order } from "../models/order.model.js";

// create new order
const newOrder = asyncHandler(async (req, res) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order placed successfully"));
});

// get single order
const getSingleOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    throw new ApiError(404, "Order not found with this Id");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, order, "order fetched successfully"));
});

//get logged i all orders / my orderss
const myOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "all user's orders are fetched"));
});

// get all orders (ADMIN)
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  return res.status(200).json({ success: true, orders, totalAmount });
});

// update order status (ADMIN)
const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new ApiError(404, "Order no found with this Id");
  }

  if (order.status === "Delivered") {
    throw new ApiError(400, "You have already delivered this order");
  }

  order.orderItems.forEach(async (key) => {
    await updateStock(key.product, key.quantity);
  });

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Order status updated successfully"));
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// delete order (ADMIN)
const deleteOrder = asyncHandler(async (req, res) => {
  const order = Order.findById(req.params.id);

  if (!order) {
    throw new ApiError(404, "Order no found with this Id");
  }

  await order.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Order deleted successfully"));
});

export {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
