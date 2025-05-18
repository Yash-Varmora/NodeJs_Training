import { Request, Response } from "express";
import { asyncHandler } from "../utils/errorHandler";
import Cart from "../models/Cart";

export const getCart = asyncHandler(async (req: Request, res: Response) => {
  const cart = await Cart.findOne({ user: req.user?.id }).populate(
    "items.product"
  );

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  res.json(cart);
});

export const addToCart = asyncHandler(async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;

  let cart = await Cart.findOne({ user: req.user?.id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user?.id,
      items: [{ product: productId, quantity }],
    });
  } else {
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
    await cart.save();
  }

  await cart.populate("items.product");
  res.json(cart);
});

export const updateCart = asyncHandler(async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;

  const cart = await Cart.findOne({ user: req.user?.id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex > -1) {
    if (quantity === 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }
    await cart.save();
  }

  await cart.populate("items.product");
  res.json(cart);
});
