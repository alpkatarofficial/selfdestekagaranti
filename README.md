# Email setup

- Set up SendGrid Domain Authentication for your domain (see SendGrid docs).
- Configure Link Branding in SendGrid to match your domain for best deliverability.
- Add your SendGrid API key to `SENDGRID_API_KEY` in `.env.local` (never commit secrets).
- Set `MAIL_FROM` to a verified sender address on your authenticated domain.
- Set `MAIL_TO` to `servis-talebi@agaranti.com.tr` (all form submissions go here).
- Optionally enable SendGrid sandbox mode for testing (see SendGrid docs).
- Ensure your domain’s SPF/DKIM records are correctly published and verified.
- Restart your Next.js server after updating environment variables.
- Test email delivery by submitting a form in the app (check both success and error cases).
- Review server logs for SendGrid errors and verify fallback to SMTP if configured.
- Publish a DMARC record aligned to your From domain (e.g., v=DMARC1; p=none; rua=...).
