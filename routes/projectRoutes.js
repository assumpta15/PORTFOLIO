import express from "express";
import {
  getPublicProjects,
  getPublicProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();

/* =======================
   PUBLIC ROUTES
======================= */

// GET all public projects
router.get("/", getPublicProjects);

// GET single public project
router.get("/:id", getPublicProjectById);

/* =======================
   ADMIN ROUTES
======================= */

// CREATE project
router.post(
  "/admin",
  authMiddleware,
  upload.single("image"),
  createProject
);

// UPDATE project
router.put(
  "/admin/:id",
  authMiddleware,
  upload.single("image"),
  updateProject
);

// DELETE project
router.delete(
  "/admin/:id",
  authMiddleware,
  deleteProject
);

export default router;
