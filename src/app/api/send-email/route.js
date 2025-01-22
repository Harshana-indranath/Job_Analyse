// pages/api/send-email.js
import nodemailer from "nodemailer";

export async function POST(req) {
  const { name, email, message } = await req.json();

  // Create a transporter object using SMTP transport (configure with your email provider)
  const transporter = nodemailer.createTransport({
    service: "gmail", // Or use another service like Mailgun, SendGrid, etc.
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password or app password
    },
  });

  // Setup email data
  const mailOptions = {
    from: email, // Sender's email (user's email from the form)
    to: process.env.EMAIL_RECEIVER, // Recipient email (your email)
    subject: "New Contact Form Submission",
    text: `You have a new message from ${name} (${email}):\n\n${message}`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ text: "Message sent successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error sending email:", error);

    return new Response(JSON.stringify({ error: "Error sending email" }), {
      status: 500,
    });
  }
}
