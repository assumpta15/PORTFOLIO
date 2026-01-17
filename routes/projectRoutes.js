
import express from "express";
import {
  getPublicProjects,
  getPublicProjectById,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjects,

} from "../controllers/projectController.js";
import authMiddleware from "../middleware/authMiddleware.js";

import upload from "../middleware/multer.js";
const router = express.Router();

// PUBLIC ROUTES 
router.get("/", getPublicProjects);
router.get("/:id", getPublicProjectById);

// ADMIN / PROTECTED ROUTES 
router.post(
  "/projects",
  upload.single("image"),
  createProject
);

router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  updateProject
);   



router.get("/", getProjects);
router.get("/:id", getProjectById); 




router.delete("/:id", authMiddleware, deleteProject);







router.post("/", upload.single("image"), createProject);

router.put("/projects/:id", upload.single("image"), updateProject);


export default router;
