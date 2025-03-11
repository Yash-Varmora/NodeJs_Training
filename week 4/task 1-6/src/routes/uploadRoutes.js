import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import CustomError from "../utils/CustomError.js";

const router = Router();

const uploadDir = "myFiles";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}` + ext);

    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(new CustomError("Only .jpg files are allowed!", 400), false);
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})

router.post("/", upload.single("image"), (req, res,next) => { 
    try {
    
    if (!req.file) {
        throw new CustomError("Invalid file type or no file uploaded!",400);
    }
        res.status(200).json({ success: true, message: "File uploaded successfully!", filePath: req.file.path });

    } catch (error) {
        next(error);
    }
})

export default router;