import express from "express";
import { protect } from "../middleware";
import { deleteProfile, getProfile, updateProfile } from "../controller/userController";

const router = express.Router();

router.use(protect);
router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.delete("/profile", deleteProfile);

export default router;
