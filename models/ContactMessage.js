



import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    message: String,

    isRead: {
      type: Boolean,
      default: false,
    },

    replied: {
      type: Boolean,
      default: false,
    },

    replyText: String,

    repliedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("ContactMessage", contactMessageSchema);
