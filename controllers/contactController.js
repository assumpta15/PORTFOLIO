import nodemailer from "nodemailer";
import ContactMessage from "../models/ContactMessage.js";

export const sendContactEmail = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    // ✅ Save message ONCE to MongoDB
    const savedMessage = await ContactMessage.create({
      name,
      email,
      message,
    });

    // ✅ Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Assumpta.dev" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: "New Portfolio Contact",
      html: `
        <h3>New Contact Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("CONTACT ERROR:", error);
    res.status(500).json({ message: "Failed to send message" });
  }
};
