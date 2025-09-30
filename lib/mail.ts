import "server-only";

/**
 * SendGrid Web API v3 email helper for Next.js server actions.
 *
 * - From: process.env.MAIL_FROM (must be a verified sender on your authenticated domain)
 * - To: process.env.MAIL_TO (default destination for all form submissions)
 * - Reply-To: set to the end user's email if provided
 *
 * Usage: import and call from server actions only. No client-side usage.
 */

import sgMail from "@sendgrid/mail";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const MAIL_FROM = process.env.MAIL_FROM;
const MAIL_TO = process.env.MAIL_TO;
const SANDBOX = process.env.SENDGRID_SANDBOX === "true";

if (!SENDGRID_API_KEY) throw new Error("SENDGRID_API_KEY is not set");
if (!MAIL_FROM) throw new Error("MAIL_FROM is not set");
if (!MAIL_TO) throw new Error("MAIL_TO is not set");

sgMail.setApiKey(SENDGRID_API_KEY);

export type SendMailOptions = {
  subject?: string;
  html?: string;
  text?: string;
  replyTo?: string;
  categories?: string[];
  customArgs?: Record<string, string>;
  templateId?: string;
  dynamicTemplateData?: Record<string, any>;
  to?: string; // optional override
};

export async function sendMail(
  options: SendMailOptions
): Promise<{ ok: true; status: number } | { ok: false; status?: number; error: string }> {
  const to = options.to || MAIL_TO;
  const from = MAIL_FROM;
  const replyTo = options.replyTo;

  let msg: any = {
    to,
    from,
    ...(replyTo ? { replyTo } : {}),
    ...(options.categories ? { categories: options.categories } : {}),
    ...(options.customArgs ? { customArgs: options.customArgs } : {}),
    ...(SANDBOX ? { mailSettings: { sandboxMode: { enable: true } } } : {}),
  };

  if (options.templateId) {
    msg = {
      ...msg,
      templateId: options.templateId,
      dynamicTemplateData: options.dynamicTemplateData || {},
    };
  } else {
    if (!options.html && !options.text) {
      return { ok: false, error: "Either html or text must be provided if no templateId." };
    }
    if (!options.subject) {
      return { ok: false, error: "Subject is required if no templateId." };
    }
    msg = {
      ...msg,
      subject: options.subject,
      ...(options.html ? { html: options.html } : {}),
      ...(options.text ? { text: options.text } : {}),
    };
  }

  try {
    const [response] = await sgMail.send(msg);
    console.log(
      "[SendGrid] status:",
      response.statusCode,
      "categories:",
      options.categories,
      "customArgs:",
      options.customArgs,
      "text/html:",
      (options.text || options.html || "").slice(0, 100)
    );
    return { ok: true, status: response.statusCode };
  } catch (error: any) {
    const status = error?.response?.statusCode ?? error?.code;
    const body = error?.response?.body;
    console.error("[SendGrid ERROR]", {
      status,
      categories: options.categories,
      customArgs: options.customArgs,
      error: body || error.message,
      text: (options.text || "").slice(0, 100),
      html: (options.html || "").slice(0, 100),
    });
    return {
      ok: false,
      status,
      error:
        typeof body === "string"
          ? body
          : body?.errors?.[0]?.message || error.message || "Unknown error",
    };
  }
}
