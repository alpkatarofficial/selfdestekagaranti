"use server";

import { sendMail } from "@/lib/mail";
import { parseServisTalebi } from "@/lib/validation";
import { assertNotRateLimited } from "@/lib/ratelimit";

export async function sendEmailSMTP(formData: FormData) {
  // Basic IP rate limit
  const rl = assertNotRateLimited();
  if (!rl.ok) {
    return { success: false, error: `Too many requests. Try again in ${rl.retryAfter}s.` };
  }

  // Validate inputs
  const parsed = parseServisTalebi(formData);
  if (!parsed.ok) return { success: false, error: parsed.error };

  const { name, email, phone, subject, message, website } = parsed.data;

  // Honeypot
  if (website) return { success: true };

  // Subject + bodies
  const safeSubject = subject ?? `Servis Talebi: ${name}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    ...(phone ? [`Phone: ${phone}`] : []),
    `Subject: ${safeSubject}`,
    "Message:",
    message,
  ].join("\n");

  const html = [
    `<p><strong>Name:</strong> ${name}</p>`,
    `<p><strong>Email:</strong> ${email}</p>`,
    phone ? `<p><strong>Phone:</strong> ${phone}</p>` : "",
    `<p><strong>Subject:</strong> ${safeSubject}</p>`,
    `<p><strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}</p>`,
  ].join("\n");

  // Send via SendGrid Web API helper
  const result = await sendMail({
    subject: safeSubject,
    text,
    html,
    replyTo: email, // so replying goes to the customer
    categories: ["servis-talebi"],
    customArgs: { route: "servis-talebi" },
  });

  if (result.ok) return { success: true };
  return { success: false, error: result.error || "Email send failed" };
}
