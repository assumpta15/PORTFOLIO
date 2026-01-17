import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const cloudStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio-projects",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

export const uploadCloud = multer({ storage: cloudStorage });


const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const uploadLocal = multer({ storage: localStorage });



const storage = multer.memoryStorage();

const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});


const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image"), false);
  }
};





export default upload;