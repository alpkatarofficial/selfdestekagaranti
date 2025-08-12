"use server"

import nodemailer from "nodemailer"

// Create a transporter using SendGrid SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "apikey", // This is literally the string "apikey"
    pass: process.env.SENDGRID_API_KEY, // Your SendGrid API key
  },
})

export async function sendEmailSMTP(formData: FormData) {
  try {
    // Get form data
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const subject = (formData.get("subject") as string) || `Contact Form: Message from ${name}`
    const message = formData.get("message") as string

    // Server-side validation
    if (!name || !email || !message) {
      return { success: false, error: "All fields are required" }
    }

    // Send email using Nodemailer
    const info = await transporter.sendMail({
      from: '"AGaranti Self Servis" <info@agaranti.com.tr>', // Your verified sender
      to: "selfservis@agaranti.com.tr", // Your verified recipient
      replyTo: email, // So you can reply directly to the sender
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    })

    console.log("Message sent: %s", info.messageId)
    return { success: true }
  } catch (error) {
    console.error("Email sending error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}
