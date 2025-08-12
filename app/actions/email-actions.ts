"use server"

export async function sendEmail(formData: FormData) {
  try {
    // Get form data
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    // Server-side validation
    if (!name || !email || !message) {
      return { success: false, error: "All fields are required" }
    }

    // Using fetch API to send email via SendGrid
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: "selfservis@agaranti.com.tr" }], // Your verified recipient
          },
        ],
        from: { email: "alpkatar@linkdijital.com.tr" }, // Your verified sender
        subject: subject || `Contact Form: Message from ${name}`,
        content: [
          {
            type: "text/plain",
            value: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`,
          },
          {
            type: "text/html",
            value: `
              <h3>New Contact Form Submission</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, "<br>")}</p>
            `,
          },
        ],
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      console.error("SendGrid API error:", errorData || response.statusText)
      return { success: false, error: "Failed to send email" }
    }

    return { success: true }
  } catch (error) {
    console.error("Email sending error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}
