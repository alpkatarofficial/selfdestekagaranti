import { z } from 'zod';
/**
 * Honeypot field: "website" must always be empty.
 * All string fields are trimmed.
 * For server-side validation only.
 */
export const iletisimSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().trim(),
  subject: z.string().max(150).optional().transform(v => v?.trim() || undefined),
  message: z.string().min(5).max(5000).trim(),
  website: z.string().max(0).optional().default(''),
});
export const servisTalebiSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().trim(),
  phone: z.string().max(50).optional().transform(v => v?.trim() || undefined),
  subject: z.string().max(150).optional().transform(v => v?.trim() || undefined),
  message: z.string().min(5).max(5000).trim(),
  website: z.string().max(0).optional().default(''),
});
export function parseIletisim(formData: FormData): { ok: true; data: any } | { ok: false; error: string } {
  const data = {
    name: formData.get('name')?.toString() || '',
    email: formData.get('email')?.toString() || '',
    subject: formData.get('subject')?.toString() || undefined,
    message: formData.get('message')?.toString() || '',
    website: formData.get('website')?.toString() || '',
  };
  const result = iletisimSchema.safeParse(data);
  if (result.success) {
    return { ok: true, data: result.data };
  }
  return { ok: false, error: result.error.issues[0]?.message || 'Invalid input' };
}
export function parseServisTalebi(formData: FormData): { ok: true; data: any } | { ok: false; error: string } {
  const data = {
    name: formData.get('name')?.toString() || '',
    email: formData.get('email')?.toString() || '',
    phone: formData.get('phone')?.toString() || undefined,
    subject: formData.get('subject')?.toString() || undefined,
    message: formData.get('message')?.toString() || '',
    website: formData.get('website')?.toString() || '',
  };
  const result = servisTalebiSchema.safeParse(data);
  if (result.success) {
    return { ok: true, data: result.data };
  }
  return { ok: false, error: result.error.issues[0]?.message || 'Invalid input' };
}
