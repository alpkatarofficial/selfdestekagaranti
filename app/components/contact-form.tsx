"use client"

import { useState } from "react"
import { sendEmailSMTP } from "@/app/actions/email-smtp-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
  }>({})

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setFormStatus({})

    try {
      const result = await sendEmailSMTP(formData)

      if (result.success) {
        setFormStatus({
          success: true,
          message: "Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.",
        })
        // Reset form
        const form = document.getElementById("contact-form") as HTMLFormElement
        form?.reset()
      } else {
        setFormStatus({
          success: false,
          message: result.error || "Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
        })
      }
    } catch (error) {
      setFormStatus({
        success: false,
        message: "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form id="contact-form" action={handleSubmit} className="space-y-4">
      {formStatus.message && (
        <div
          className={`p-4 mb-4 rounded-md ${
            formStatus.success
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {formStatus.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Adınız Soyadınız
          </label>
          <Input id="name" name="name" placeholder="Adınız Soyadınız" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            E-posta Adresiniz
          </label>
          <Input id="email" name="email" type="email" placeholder="ornek@email.com" required />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium">
          Konu
        </label>
        <Input id="subject" name="subject" placeholder="Mesajınızın konusu" required />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Mesajınız
        </label>
        <Textarea id="message" name="message" placeholder="Mesajınızı buraya yazın..." rows={5} required />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Gönderiliyor..." : "Mesaj Gönder"}
      </Button>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        * Formunuz gönderildikten sonra en kısa sürede size dönüş yapılacaktır.
      </p>
    </form>
  )
}
