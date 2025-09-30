import 'server-only';
import { headers } from 'next/headers';
const WINDOW_MS = 600_000; // 10 minutes
const LIMIT = 5;
const ipMap = new Map<string, number[]>();
export function getClientIp(): string {
  const h = headers();
  const xff = h.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  const xri = h.get('x-real-ip');
  if (xri) return xri;
  return '127.0.0.1';
}
export function assertNotRateLimited(): { ok: true } | { ok: false; error: string; retryAfter: number } {
  const ip = getClientIp();
  const now = Date.now();
  const timestamps = ipMap.get(ip) || [];
  const recent = timestamps.filter(ts => now - ts < WINDOW_MS);
  if (recent.length >= LIMIT) {
    const retryAfterMs = WINDOW_MS - (now - recent[0]);
    return {
      ok: false,
      error: 'Too many requests',
      retryAfter: Math.ceil(retryAfterMs / 1000),
    };
  }
  recent.push(now);
  ipMap.set(ip, recent);
  return { ok: true };
}
