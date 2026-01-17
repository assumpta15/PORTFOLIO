import Project from "../models/Project.js";
import cloudinary from "../config/cloudinary.js";

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    let imageUrl = project.image;

    // ✅ ONLY upload if a new image exists
    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path);
      imageUrl = upload.secure_url;
    }

    project.title = req.body.title;
    project.description = req.body.description;
    project.techStack = JSON.parse(req.body.techStack || "[]");
    project.liveUrl = req.body.liveUrl;
    project.githubUrl = req.body.githubUrl;
    project.featured = req.body.featured === "true" || req.body.featured === true;
    project.image = imageUrl;

    await project.save();

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("UPDATE PROJECT ERROR:", error);
    res.status(500).json({ message: "Update failed" });
  }
};


export const deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  await project.deleteOne();
  res.json({ message: "Project deleted" });
};


// export const getProjectById = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id);

//     if (!project) {
//       return res.status(404).json({ message: "Project not found" });
//     }

//     res.json(project);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error("GET PROJECTS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};





// PUBLIC — only live projects
export const getPublicProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ status: "live" }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

// ADMIN — all projects
export const getAdminProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};




export const getPublicProjectById = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      status: "live",
    });

    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};






export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



export const createProject = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const upload = await cloudinary.uploader.upload(req.file.path);

    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      techStack: JSON.parse(req.body.techStack || "[]"),
      liveUrl: req.body.liveUrl,
      githubUrl: req.body.githubUrl,
      featured: req.body.featured === "true" || req.body.featured === true,
      image: upload.secure_url,
    });

    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("ADD PROJECT ERROR:", error);
    res.status(500).json({ message: "Failed to add project" });
  }
};
