import express from "express";

import {
  getAdminProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";



const router = express.Router();

// ADMIN routes (protected)
router.get("/", authMiddleware, getAdminProjects);
router.post("/", authMiddleware, createProject);
router.put("/:id", authMiddleware, updateProject);
router.delete("/:id", authMiddleware, deleteProject);

router.post(
  "/projects",
  upload.single("image"),
  createProject
);

router.put(
  "/projects/:id",
  upload.single("image"),
  updateProject
);

export default router;
