import { Request, Response } from "express";
import bcrypt from "bcryptjs"
import { asyncHandler } from "../utils/errorHandler";
import User from "../models/User";

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.user?.id).select("-password");
  res.json(user);
});

export const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.user?.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = await bcrypt.hash(req.body.password, 10);
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }
);

export const deleteProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.user?.id);

    if (user) {
      await user.deleteOne();
      res.json({ message: "User removed" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }
);
