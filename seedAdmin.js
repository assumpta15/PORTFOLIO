import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "./models/Admin.js";
import dotenv from "dotenv";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Admin.deleteMany(); // remove old admins

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await Admin.create({
      email: "admin@portfolio.com",
      password: hashedPassword,
    });

    console.log("✅ Admin seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
