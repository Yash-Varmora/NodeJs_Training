import { Router } from "express";
import auth from "../middlewares/authMiddleware.js";
import { createBook, deleteBookById, getAllBooks, getBookById, updateBookById } from "../controllers/bookControllers.js";
import role from "../middlewares/roleMiddleware.js";

const router = Router();

router.get("/", auth,getAllBooks);
router.get("/:id",auth ,getBookById);

router.post("/",auth,role ,createBook);
router.put("/:id", auth,role, updateBookById);
router.delete("/:id", auth,role, deleteBookById);

export default router;