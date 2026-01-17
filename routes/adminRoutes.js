


import express from "express";
import ContactMessage from "../models/ContactMessage.js";
import nodemailer from "nodemailer";

const router = express.Router();

// GET ALL MESSAGES //
router.get("/messages", async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    console.error("ADMIN FETCH ERROR:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

/* REPLY TO A MESSAGE */
router.post("/messages/:id/reply", async (req, res) => {
  const { reply } = req.body;

  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) return res.status(404).json({ error: "Message not found" });

    // Send email to user
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Assumpta.dev" <${process.env.EMAIL_USER}>`,
      to: message.email,
      subject: "Reply from Assumpta",
      html: `
        <p>Hi ${message.name},</p>
        <p>${reply}</p>
        <br/>
        <p>– Assumpta</p>
      `,
    });

    // Save reply in DB
    message.replied = true;
    message.replyText = reply;
    message.repliedAt = new Date();
    await message.save();

    res.json({ success: true });
  } catch (err) {
    console.error("REPLY ERROR:", err);
    res.status(500).json({ error: "Failed to reply" });
  }
});


// Count new (unreplied) messages
router.get("/messages/unread-count", async (req, res) => {
  try {
    const count = await ContactMessage.countDocuments({ replied: false });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: "Failed to count messages" });
  }
});








// Get all messages
router.get("/messages", async (req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  res.json(messages);
});

// MARK AS READ
router.patch("/messages/:id/read", async (req, res) => {
  try {
    const msg = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    res.json(msg);
  } catch (err) {
    res.status(500).json({ error: "Failed to mark as read" });
  }
});

// UNREAD COUNT
router.get("/messages/unread-count", async (req, res) => {
  const count = await ContactMessage.countDocuments({ isRead: false });
  res.json({ count });
});


router.patch("/messages/:id/read", async (req, res) => {
  try {
    const msg = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    res.json(msg);
  } catch (err) {
    res.status(500).json({ error: "Failed to mark as read" });
  }
});

export default router;











