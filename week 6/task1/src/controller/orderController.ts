import { Request, Response } from "express";
import { asyncHandler } from "../utils/errorHandler";
import Cart from "../models/Cart";
import Order from "../models/Order";
import Product from "../models/Product";

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product"
  );
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  for (const item of cart.items) {
    const product = item.product as any;
    if (product.stock < item.quantity) {
      return res.status(400).json({
        message: `Insufficient stock for product ${product.name}. Available: ${product.stock}, Required: ${item.quantity}`,
      });
    }
  }

  const order = await Order.create({
    user: req.user._id,
    items: cart.items.map((item) => ({
      product: (item.product as any)._id,
      quantity: item.quantity,
      price: (item.product as any).price,
    })),
    total: cart.items.reduce(
      (acc, item) => acc + (item.product as any).price * item.quantity,
      0
    ),
  });

  await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });

  res.status(201).json(order);
});

export const getOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await Order.find({ user: req.user?.id })
    .populate("items.product")
    .sort({ createdAt: -1 });

  res.json(orders);
});

export const updateOrderStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { orderId, status } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const order = await Order.findById(orderId).populate("items.product");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const isSellerAuthorized = order.items.some(
      (item) =>
        req.user &&
        (item.product as any).seller.toString() === req.user._id.toString()
    );
    if (!isSellerAuthorized) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this order" });
    }

    const validStatuses = ["pending", "processing", "shipped", "delivered"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    if (status === "shipped" && order.status !== "shipped") {
      for (const item of order.items) {
        const product = await Product.findById((item.product as any)._id);
        if (!product) {
          return res
            .status(404)
            .json({
              message: `Product ${(item.product as any)._id} not found`,
            });
        }

        if (product.stock < item.quantity) {
          return res.status(400).json({
            message: `Insufficient stock for product ${product.name}. Available: ${product.stock}, Required: ${item.quantity}`,
          });
        }

        product.stock -= item.quantity;
        await product.save();
      }
    }

    order.status = status;
    await order.save();

    res.json({
      message: "Order status updated",
      order,
    });
  }
);

export const getSellerOrders = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const orders = await Order.find()
      .populate("items.product")
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    const sellerOrders = orders.filter((order) =>
      order.items.some(
        (item) =>
          req.user &&
          (item.product as any).seller.toString() === req.user._id.toString()
      )
    );

    res.json(sellerOrders);
  }
);

export const cancelOrder = asyncHandler(async (req: Request, res: Response) => {
  const { orderId } = req.params;

  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const order = await Order.findById(orderId).populate("items.product");
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  if (!["pending", "processing"].includes(order.status)) {
    return res
      .status(400)
      .json({ message: "Order cannot be canceled in current status" });
  }

  const isBuyer = order.user.toString() === req.user._id.toString();
  const isSeller = order.items.some(
    (item) =>
      req.user &&
      (item.product as any).seller.toString() === req.user._id.toString()
  );

  if (!isBuyer && !isSeller) {
    return res
      .status(403)
      .json({ message: "Not authorized to cancel this order" });
  }

  if (order.status === "shipped") {
    for (const item of order.items) {
      const product = await Product.findById((item.product as any)._id);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }
  }

  await order.deleteOne();
  res.json({ message: "Order canceled" });
});